import { Get } from '../utils/http.api';

export const getMemberApi = () => Get('members');

export const getMemberSameBookApi = ({ ...params }) => Get(`members/same-book-members`, params);

export const getMemberPostcardsApi = () => Get(`members/postcards`);

export const getMemberStatusesApi = () => Get('members/statuses');
