import { postMemberBookApi } from '../../../../../commons/api/memberBook.api';
import useMovePage from '../../../../../commons/hooks/useMovePage';
import useToastStore from '../../../../../commons/store/useToastStore';
import { IBookData, IRequestQuizzes } from '../../../InitBookStack.types';
import { isAxiosErrorResponse } from '../../../../../commons/utils/isAxiosErrorResponse';

export const usePostMemberBook = (isRepresentative: boolean, selectedBook: Partial<IBookData>) => {
  const { handleReset } = useMovePage();

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
        if (error.response?.data.message === '해당 회원이 이미 등록한 도서입니다.') {
          useToastStore.getState().showToast({
            content: '이미 등록한 책입니다.',
          });
        }
      } else {
        useToastStore.getState().showToast({
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
