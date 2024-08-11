import { Get } from '../../configs/axios/http.api';

export const getSchools = () => Get(`schools`);

export const getSchoolMembers = () => Get(`schools/members`);
