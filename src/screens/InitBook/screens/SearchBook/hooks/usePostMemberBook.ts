import { postMemberBookApi } from '../../../../../commons/api/memberBook.api';
import useMovePage from '../../../../../commons/hooks/useMovePage';
import { IBookData } from '../../../InitBookStack.types';

export const usePostMemberBook = () => {
  const { movePage } = useMovePage();

  const callPostMemberBook = (isRepresentative: boolean, selectedBook: Partial<IBookData>) => async () => {
    try {
      const newData = {
        isRepresentative,
        ...selectedBook,
        thumbnail: String(selectedBook.imageUrl),
      };
      delete newData.imageUrl;
      const response = await postMemberBookApi(newData);
      const memberBookId = response.result.memberBookId;
      movePage('initQuiz', { memberBookId })();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    callPostMemberBook,
  };
};
