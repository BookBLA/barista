import { postMemberQuizzesApi } from '@commons/api/quiz/memberQuizzes.api';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { IRequestQuizzes } from '@screens/InitBook/InitBookStack.types';

// TODO: 성진 - 이제 사용하지 않을 예정
export const usePostMemberQuizzes = (memberBookId: string) => {
  const { handleReset } = useMovePage();

  const callPostMemberQuizzes = async (data: IRequestQuizzes) => {
    try {
      if (memberBookId) {
        await postMemberQuizzesApi(data, memberBookId);
        handleReset('initBookStack');
      }
    } catch (error) {
      if (error instanceof Error) {
        useToastStore.getState().showToast({ content: '퀴즈 등록에 실패하였습니다.' });
      }
    }
  };

  return {
    callPostMemberQuizzes,
  };
};
