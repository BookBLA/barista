import { IBookData } from '@screens/InitBook/InitBookStack.types';

export interface IProps {
  route: {
    params: {
      selectedBook: Partial<IBookData>;
    };
  };
}
