#!/bin/sh

EXIT_SUCCESS=0
EXIT_BUILD_SUCCES=1
EXIT_EAS_SECRET_PUSH_FAIL=10
EXIT_INVALID_PLATFORM=20
EXIT_GIT_FAIL=30
EXIT_GIT_TAG_FETCH_FAIL=31
EXIT_GIT_TAG_FAIL=32
EXIT_GIT_CHECKOUT_FAIL=33
EXIT_DOPPLER_UPDATE_FALI=40
EXIT_DOPPLER_APP_JSON_UPDATE_FALI=41
EXIT_DOPPLER_EAS_JSON_UPDATE_FALI=42
EXIT_FILE_REMOVE_FAIL=50
EXIT_FILE_UPDATE_APP_JSON=51
EXIT_FILE_UPDATE_EAS_JSON=52
EXIT_NPM_CACHE_FIL=60
EXIT_NPM_INSTALL_FIL=61

PLATFORM=${1:-android}
ENVIRONMENT=${2:-PLATFORM}

LOG_FILE="build.log"

echo "=================================================="
echo "빌드를 진행한 날짜: $(date)"
echo "빌드를 진행할 환경: $ENVIRONMENT"
echo "빌드를 진행할 플랫폼: $PLATFORM"
echo "=================================================="


read -p "빌드를 진행하기 전에 Git 태그를 작성했습니까? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
  echo "빌드를 진행하려면 Git 태그를 작성해야 합니다. 예: git tag -a 0.1.0 -m \"BookBLA - version 0.1.0\""
  exit $EXIT_BUILD_SUCCES
fi

doppler setup --no-interactive --config $ENVIRONMENT
doppler configure

git tag -l | xargs git tag -d

git fetch --tags
if [ $? -ne 0 ]; then
  echo '태그 정보를 가져오는데 실패했습니다.'
  exit $EXIT_GIT_TAG_FETCH_FAIL
fi

LATEST_TAG=$(git describe --tags `git rev-list --tags --max-count=1`)
if [ $? -ne 0 ]; then
  echo '최신 Git 태그를 가져오는데 실패했습니다.'
  exit $EXIT_GIT_TAG_FAIL
fi

git checkout $LATEST_TAG
if [ $? -ne 0 ]; then
  echo '태그 $LATEST_TAG로 체크아웃하는데 실패했습니다.'
  exit $EXIT_GIT_CHECKOUT_FAIL
fi

echo "태그 $LATEST_TAG 로 이동했습니다."

npm cache clean --force
if [ $? -ne 0 ]; then
  echo 'npm 캐시를 지우는데 실패했습니다.'
  exit $EXIT_NPM_CACHE_FIL
fi

npm install
if [ $? -ne 0 ]; then
  echo 'npm 패키지 설치에 실패했습니다.'
  exit $EXIT_NPM_INSTALL_FIL
fi

doppler run --command 'echo $EAS_JSON > eas.json'
cat eas.json
echo 'eas.json 파일 생성했습니다.'

doppler run --command 'echo $GOOGLE_SERVICES_JSON > google-services.json'
cat google-services.json
echo 'google-services.json 파일 생성했습니다.'

doppler run --command 'echo $GOOGLE_SERVICE_INFO_PLIST > GoogleService-Info.plist'
cat GoogleService-Info.plist
echo 'GoogleService-Info.plist 파일 생성했습니다.'

doppler run --command 'echo $APP_JSON > app.json'
cat app.json
echo 'app.json 파일 생성했습니다.'

doppler run --command 'echo $FIREBASE_JSON> ./bookbla-2024-firebase-adminsdk-qfspu-1dcca92597.json'
cat ./bookbla-2024-firebase-adminsdk-qfspu-1dcca92597.json
echo './bookbla-2024-firebase-adminsdk-qfspu-1dcca92597.json 파일 생성했습니다.'

jq --arg version "$LATEST_TAG" '.expo.version = $version' app.json > app_temp.json && mv app_temp.json app.json
if [ $? -ne 0 ]; then
  echo 'app.json의 버전 업데이트에 실패했습니다.'
  exit $EXIT_FILE_UPDATE_APP_JSON
fi

echo "app.json 파일의 버전을 최신 태그로 업데이트했습니다."
cat app.json

# doppler run --mount .env -- eas secret:push --scope project --env-file .env --force
# if [ $? -eq 0 ]; then
#   echo 'EAS secrets 성공적으로 푸시되었습니다.'
# else
#   echo 'EAS secrets 푸시에 실패했습니다.'
#   exit $EXIT_EAS_SECRET_PUSH_FAIL
# fi

case $PLATFORM in
  all)
    echo '모든 플랫폼에 대해 빌드를 진행합니다.'
    eas build --platform all --profile $ENVIRONMENT 
    ;;
  android)
    echo '안드로이드 플랫폼에 대해 빌드를 진행합니다.'
    eas build --platform android --profile $ENVIRONMENT 
    ;;
  ios)
    echo 'iOS 플랫폼에 대해 빌드를 진행합니다.'
    eas build --platform ios --profile $ENVIRONMENT 
    ;;
  *)
    echo '유효하지 않은 플랫폼입니다. 'all', 'android', 'ios' 중 하나를 선택하세요.'
    exit $EXIT_INVALID_PLATFORM
    ;;
esac

doppler secrets set APP_JSON="$(cat app.json)"
if [ $? -eq 0 ]; then
  echo 'app.json을 성공적으로 Doppler에 업데이트했습니다.'
else
  echo 'app.json을 Doppler에 업데이트하는데 실패했습니다.'
  exit $EXIT_DOPPLER_APP_JSON_UPDATE_FALI
fi

case $PLATFORM in
  all)
    echo '모든 플랫폼에 대해 제출을 진행합니다.'
    eas submit --platform ios
    eas submit --platform android
    ;;
  android)
    echo '안드로이드 플랫폼에 대해 제출을 진행합니다.'
    eas submit --platform android
    ;;
  ios)
    echo 'iOS 플랫폼에 대해 제출을 진행합니다.'
    eas submit --platform ios
    ;;
esac

# rm eas.json google-services.json app.json ./bookbla-2024-firebase-adminsdk-qfspu-1dcca92597.json
# if [ $? -eq 0 ]; then
#   echo '생성된 json파일들을 성공적으로 삭제했습니다.'
# else
#   echo '생성된 json파일들을 삭제하는데 실패했습니다.'
#   exit $EXIT_FILE_REMOVE_FAIL
# fi

EXPO_PUBLIC_BASE_URL=$(doppler run --command 'echo $EXPO_PUBLIC_BASE_URL')
if [ $? -ne 0 ];then
  echo 'Doppler에서 EXPO_PUBLIC_BASE_URL을 가져오는데 실패했습니다.'
  exit $EXIT_DOPPLER_UPDATE_FALI
fi

curl -X 'POST' \
  "${EXPO_PUBLIC_BASE_URL}settings/versions" \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d "{
  \"version\": \"$LATEST_TAG\"
}"

if [ $? -ne 0 ]; then
  echo '버전 업데이트 요청이 실패했습니다.'
  exit 1
else
  echo '버전 업데이트 요청이 성공했습니다.'
fi

END_TIME=$(date)
echo "빌드가 완료되었습니다. 종료 시간: $END_TIME"

exit $EXIT_SUCCESS

