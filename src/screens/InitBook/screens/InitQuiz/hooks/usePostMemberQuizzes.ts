import { postMemberQuizzesApi } from '../../../../../commons/api/memberQuizzes.api';
import useMovePage from '../../../../../commons/hooks/useMovePage';
import useToastStore from '../../../../../commons/store/useToastStore';
import { IRequestQuizzes } from '../../../InitBookStack.types';

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
