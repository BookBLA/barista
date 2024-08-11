#!/bin/sh

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

doppler run --command 'echo $FIREBASE_JSON > ./bookbla-2024-firebase-adminsdk-qfspu-1dcca92597.json'
cat ./bookbla-2024-firebase-adminsdk-qfspu-1dcca92597.json
echo 'bookbla-2024-firebase-adminsdk-qfspu-1dcca92597.json 파일 생성했습니다.'
