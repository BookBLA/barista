import { MemberBookReadResponse } from '@commons/types/openapiGenerator';

export interface FavBookListProps {
  representative?: boolean;
  fetchGetMemberBook: () => Promise<void>;
  item: MemberBookReadResponse;
}
