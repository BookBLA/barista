import { Post } from '@commons/configs/axios/http.api';

export const postPaymentApi = (payType: string, receipt: string) => Post(`payments/in-app/${payType}`, { transactionId: receipt });