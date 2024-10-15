import { getStudentIdImageStatusApi } from '@commons/api/members/profile/memberProfile.api';
import useMemberStore from '@commons/store/members/member/useMemberStore';

export const useStudentIdStatus = () => {
  const { updateMemberInfo } = useMemberStore();

  const getStudentIdStatus = async () => {
    try {
      const response = await getStudentIdImageStatusApi();
      updateMemberInfo('studentIdImageStatus', response.result.studentIdImageStatus || '');
      return response.result.studentIdImageStatus;
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    getStudentIdStatus,
  };
};
