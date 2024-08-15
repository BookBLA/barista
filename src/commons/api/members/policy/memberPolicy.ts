import { Post } from '@commons/configs/axios/http.api';

export const postPolicyApi = (adAgreementPolicy: any) => Post(`members/policies`, adAgreementPolicy);
