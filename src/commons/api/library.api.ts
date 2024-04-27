import { Get } from '../utils/http.api';

export const getMyLibraryInfo = () => Get('members/library', {}, true);
export const getYourLibraryInfo = (targetMemberId: number) => Get('members/library/target', { targetMemberId }, true);
