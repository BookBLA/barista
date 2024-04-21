import { Post, Get, Put, Patch } from '../utils/http.api';

export const postMemberProfileApi = (contents) => Post(`member-profiles`, contents);

export const getMemberProfileApi = () => Get(`member-profiles`);

export const putMemberProfileApi = (contents) => Put(`member-profiles`, contents);

export const getMemberProfileStatusesApi = () => Get(`member-profiles/statuses`);

export const patchMemberProfileStatusesApi = (contents) => Patch(`member-profiles/statuses`, contents);
