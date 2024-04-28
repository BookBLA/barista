import { Post } from '../utils/http.api';

// export interface ResponseData<T> {
//   status: number;
//   message: string;
//   body: T;
// }

// export interface policyRequest {
//   adAgreementPolicy: boolean;
// }

export const postPolicyApi = (adAgreementPolicy: any) => Post(`members/policies`, adAgreementPolicy);
