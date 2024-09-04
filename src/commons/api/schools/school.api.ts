import { Get } from '@commons/configs/axios/http.api';
import { SchoolInvitationResponse, SchoolReadResponse } from '@commons/types/openapiGenerator';

export const getSchools = () => Get<SchoolReadResponse>(`schools`);

export const getSchoolMembers = () => Get<SchoolInvitationResponse>(`schools/members`);
