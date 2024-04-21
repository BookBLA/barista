import { IBookData } from '../../InitBookStack.types';

export interface IProps {
  route: {
    params: {
      isRepresentative: boolean;
      selectedBook: Partial<IBookData>;
    };
  };
}
