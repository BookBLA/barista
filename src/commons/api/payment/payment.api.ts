import { Post } from '@commons/configs/axios/http.api';

export const postPaymentApi = (receipt: string) => Post(`payments/in-app/apple`, { transactionId: receipt });

export const postPaymentGoogleApi = (productId: string, purchaseToken: string) =>
  Post(`payments/in-app/google`, { productId, purchaseToken });
