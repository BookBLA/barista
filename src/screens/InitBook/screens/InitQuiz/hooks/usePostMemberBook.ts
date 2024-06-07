import { postMemberBookApi } from '../../../../../commons/api/memberBook.api';
import useMovePage from '../../../../../commons/hooks/useMovePage';
import useToastStore from '../../../../../commons/store/useToastStore';
import { IBookData, IRequestQuizzes } from '../../../InitBookStack.types';
import { isAxiosErrorResponse } from '../../../../../commons/utils/isAxiosErrorResponse';
import { EErrorMessage } from '../../../../../commons/types/errorMessage';

export const usePostMemberBook = (isRepresentative: boolean, selectedBook: Partial<IBookData>) => {
  const { handleReset, goBack } = useMovePage();
  const showToast = useToastStore((state) => state.showToast);

  const callPostMemberBook = async (data: IRequestQuizzes) => {
    try {
      const newData = {
        isRepresentative,
        ...selectedBook,
        thumbnail: String(selectedBook.imageUrl),
        ...data,
      };
      delete newData.imageUrl;
      await postMemberBookApi(newData);
      useToastStore.getState().showToast({ content: '책 등록에 성공하였습니다.' });
      handleReset('initBookStack');
    } catch (error) {
      if (isAxiosErrorResponse(error)) {
        if (error.response?.data.message === EErrorMessage.BOOK_ALREADY_REGISTERED) {
          showToast({
            content: '이미 등록한 책입니다.',
          });
          goBack();
        }
      } else {
        showToast({
          content: '책 등록에 실패하였습니다.',
        });
      }
      console.error(error);
    }
  };

  return {
    callPostMemberBook,
  };
};
