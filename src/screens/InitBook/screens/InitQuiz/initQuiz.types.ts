import { IBookData } from '@screens/InitBook/InitBookStack.types';

export interface IProps {
  route: {
    params: {
      isRepresentative: boolean;
      selectedBook: Partial<IBookData>;
    };
  };
}
