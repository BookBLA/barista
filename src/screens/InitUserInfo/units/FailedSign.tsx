import { Props } from '../InitUserinfo.types';
import useMovePage from '../../../commons/hooks/useMovePage';
import RejectedInfo from './components/RejectedInfo/RejectedInfo';
import useManageMargin from '../../../commons/hooks/useManageMargin';
import StudentID from './components/RejectedInfo/StudentID';
import { useEffect } from 'react';
import OpenChat from './components/RejectedInfo/OpenChat';
import ReProfileImage from './components/RejectedInfo/ReProfileImage';
import { useCounter } from '../../../commons/store/useCounter';
import { useUserStore } from '../../../commons/store/useUserinfo';
import { getMemberProfileApi, putMemberProfileApi } from '../../../commons/api/memberProfile.api';

const FailedSign: React.FC<Props> = ({ route }) => {
  useManageMargin();
  const { movePage } = useMovePage();
  const { userInfo, updateUserInfo } = useUserStore();
  const rejectCase = route.params?.rejectCase ?? [];
  console.log('rejectCase', rejectCase);
  const { count } = useCounter();
  // console.log('count', count);
  useEffect(() => {
    callGetMemberProfileApi();
  }, []);

  const callGetMemberProfileApi = async () => {
    try {
      const response = await getMemberProfileApi();
      console.log('callGetMemberProfileApi', response);
      updateUserInfo({
        name: response.result.name,
        phoneNumber: response.result.phoneNumber,
        gender: response.result.gender,
        schoolName: response.result.schoolName,
        schoolEmail: response.result.schoolEmail,
        openKakaoRoomUrl: response.result.openKakaoRoomUrl,
        studentIdImageUrl: response.result.studentIdImageUrl,
        profileImageUrl: response.result.profileImageUrl,
        birthDate: response.result.birthDate,
      });
    } catch (error) {
      console.log('callGetMemberProfileApi error', error);
    }
  };

  useEffect(() => {
    console.log('count, rejectCase', count, rejectCase.length * 2);
    if (count === rejectCase.length * 2) {
      callPutMemberProfileApi();
      movePage('waitConfirm')();
    }
  }, [count]);

  const callPutMemberProfileApi = async () => {
    try {
      const response = await putMemberProfileApi({
        name: userInfo.name,
        birthDate: userInfo.birthDate,
        gender: userInfo.gender,
        schoolName: userInfo.schoolName,
        schoolEmail: userInfo.schoolEmail,
        phoneNumber: userInfo.phoneNumber,
        studentIdImageUrl: userInfo.studentIdImageUrl,
        profileImageUrl: userInfo.profileImageUrl,
        openKakaoRoomUrl: userInfo.openKakaoRoomUrl,
      });
      console.log('callPutMemberProfileApi', response);
    } catch (error) {
      console.log('callPutMemberProfileApi error', error);
    }
  };

  return (
    <>
      {/* 첫번째 승인 거부 케이스 */}
      {count === 0 && <RejectedInfo rejectCase={rejectCase[0]} />}
      {count === 1 &&
        ((rejectCase[0] === 0 && <StudentID />) ||
          ((rejectCase[0] === 1 || rejectCase[0] === 2) && <OpenChat />) ||
          (rejectCase[0] === 3 && <ReProfileImage />))}

      {count !== rejectCase.length * 2 && (
        <>
          {/* 두번째 승인 거부 케이스 */}
          {count === 2 && <RejectedInfo rejectCase={rejectCase[1]} />}
          {count === 3 &&
            (((rejectCase[1] === 1 || rejectCase[1] === 2) && <OpenChat />) ||
              (rejectCase[1] === 3 && <ReProfileImage />))}
        </>
      )}

      {count !== rejectCase.length * 2 && (
        <>
          {/* 세번째 승인 거부 케이스 */}
          {count === 4 && <RejectedInfo rejectCase={rejectCase[2]} />}
          {count === 5 && rejectCase[2] === 3 && <ReProfileImage />}
        </>
      )}
    </>
  );
};

export default FailedSign;
