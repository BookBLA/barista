import { Post } from '@commons/configs/axios/http.api';

export const postPaymentApi = (payType: string, receipt: string) => Post(`payments/in-app/${payType}`, {
  "인앱결제 후 받은 영수증 정보": `${receipt}`
});