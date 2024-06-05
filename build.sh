#!/bin/sh

EXIT_SUCCESS=0
EXIT_EAS_SECRET_PUSH_FAIL=10
EXIT_INVALID_PLATFORM=20

PLATFORM=${1:-android}

doppler run --command 'echo $EAS_JSON > eas.json'
cat eas.json
echo 'eas.json 파일 생성했습니다.'

doppler run --command 'echo $GOOGLE_SERVICES_JSON > google-services.json'
cat google-services.json
echo 'google-services.json 파일 생성했습니다.'

doppler run --command 'echo $APP_JSON > app.json'
cat app.json
echo 'app.json 파일 생성했습니다.'

doppler run --command 'echo $FIREBASE_JSON> ./bookbla-2024-firebase-adminsdk-qfspu-1dcca92597.json'
cat ./bookbla-2024-firebase-adminsdk-qfspu-1dcca92597.json
echo './bookbla-2024-firebase-adminsdk-qfspu-1dcca92597.json 파일 생성했습니다.'

doppler run --mount .env -- eas secret:push --scope project --env-file .env --force

if [ $? -eq 0 ]; then
  echo 'EAS secrets 성공적으로 푸시되었습니다.'
else
  echo 'EAS secrets 푸시에 실패했습니다.'
  exit $EXIT_EAS_SECRET_PUSH_FAIL
fi

case $PLATFORM in
  all)
    echo '모든 플랫폼에 대해 빌드를 진행합니다.'
    eas build --platform all --profile local --non-interactive
    ;;
  android)
    echo '안드로이드 플랫폼에 대해 빌드를 진행합니다.'
    eas build --platform android --profile local --non-interactive
    ;;
  ios)
    echo 'iOS 플랫폼에 대해 빌드를 진행합니다.'
    eas build --platform ios --profile local --non-interactive
    ;;
  *)
    echo '유효하지 않은 플랫폼입니다. 'all', 'android', 'ios' 중 하나를 선택하세요.'
    exit $EXIT_INVALID_PLATFORM
    ;;
esac

exit $EXIT_SUCCESS