import { IResponseMemberBook } from '@screens/InitBook/InitBookStack.types';

export interface FavBookListProps {
  representative?: boolean;
  fetchGetMemberBook: () => Promise<void>;
  item: IResponseMemberBook;
}
