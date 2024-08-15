import { Get } from '@commons/configs/axios/http.api';

export const getSchools = () => Get(`schools`);

export const getSchoolMembers = () => Get(`schools/members`);
