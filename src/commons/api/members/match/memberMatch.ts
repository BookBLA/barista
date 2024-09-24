import { Get } from '@commons/configs/axios/http.api';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';

export const getMembersMatch = () => Get<MemberIntroResponse>(`members-match`);
