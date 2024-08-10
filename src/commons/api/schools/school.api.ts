import { Get } from '../../utils/http.api';

export const getSchools = () => Get(`schools`);

export const getSchoolMembers = () => Get(`schools/members`);
