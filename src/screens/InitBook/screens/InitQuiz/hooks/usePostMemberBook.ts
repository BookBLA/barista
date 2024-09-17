import { postMemberBookApi } from '@commons/api/members/book/memberBook.api';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { EErrorMessage } from '@commons/types/errorMessage';
import { EMemberStatus } from '@commons/types/memberStatus';
import { isAxiosErrorResponse } from '@commons/utils/api/errors/isAxiosErrorResponse/isAxiosErrorResponse';
import { IBookData, IRequestQuizzes } from '@screens/InitBook/InitBookStack.types';

export const usePostMemberBook = (selectedBook: Partial<IBookData>) => {
  const { handleReset, goBack } = useMovePage();
  const showToast = useToastStore((state) => state.showToast);
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);

  const callPostMemberBook = async (data: IRequestQuizzes) => {
    try {
      const newData = {
        ...selectedBook,
        thumbnail: String(selectedBook.imageUrl),
        ...data,
      };
      delete newData.imageUrl;
      await postMemberBookApi(newData);
      useToastStore.getState().showToast({ content: '책 등록에 성공하였습니다.' });
      if (memberStatus === EMemberStatus.BOOK) handleReset('initBookStack');
      else handleReset('tapScreens', { screen: 'Library' });
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
