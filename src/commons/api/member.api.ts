import { Get } from '../utils/http.api';

export const getMemberApi = () => Get('members');

export const getMemberSameBookApi = (memberId: string, { ...params }) => Get(`members/same-book-members`, params);

export const getMemberPostcardsApi = (memberId: string) => Get(`members/postcards`);

export const getMemberStatusesApi = () => Get('members/statuses');
