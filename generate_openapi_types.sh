#!/bin/sh

EXIT_SUCCESS=0
EXIT_DOPPLER_UPDATE_FAIL=40
EXIT_OPENAPI_GENERATE_FAIL=70

ENVIRONMENT=${1:-PLATFORM}

doppler setup --no-interactive --config $ENVIRONMENT
doppler configure

EXPO_PUBLIC_BASE_URL=$(doppler run --command 'echo $EXPO_PUBLIC_BASE_URL')
if [ $? -ne 0 ];then
  echo 'Doppler에서 EXPO_PUBLIC_BASE_URL을 가져오는데 실패했습니다.'
  exit $EXIT_DOPPLER_UPDATE_FALI
fi


openapi-generator-cli generate -i "${EXPO_PUBLIC_BASE_URL}api-docs" -g typescript-axios -o ./src/commons/types/openapiGenerator --skip-validate-spec
if [ $? -ne 0 ]; then
  echo 'OpenAPI 타입 생성에 실패했습니다.'
  exit $EXIT_OPENAPI_GENERATE_FAIL
fi

echo 'OpenAPI 타입 생성에 성공했습니다.'
exit $EXIT_SUCCESS