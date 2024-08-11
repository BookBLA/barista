// export interface ResponseData<T> {
//   status: number;
//   message: string;
//   body: T;
// }

import { Post } from '../../../configs/axios/http.api';

// export interface policyRequest {
//   adAgreementPolicy: boolean;
// }

export const postPolicyApi = (adAgreementPolicy: any) => Post(`members/policies`, adAgreementPolicy);
