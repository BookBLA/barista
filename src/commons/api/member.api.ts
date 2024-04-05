import { Get } from '../utils/http.api';

export const getMemberApi = () => Get('members');

export const getMemberSameBookApi = (memberId: string, { ...params }) =>
  Get(`members/${memberId}/same-book-members`, params);

export const getMemberPostcardsApi = (memberId: string) => Get(`members/${memberId}/postcards`);

export const getMemberStatusesApi = () => Get('members/statuses');
