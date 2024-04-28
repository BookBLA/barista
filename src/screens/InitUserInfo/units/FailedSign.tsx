import { Image, View } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText.styles';
import { Props } from '../InitUserinfo.types';
import useMovePage from '../../../commons/hooks/useMovePage';
import RejectedInfo from './components/RejectedInfo/RejectedInfo';
import useManageMargin from '../../../commons/hooks/useManageMargin';
import StudentID from './components/RejectedInfo/StudentID';
import { useEffect, useState } from 'react';
import OpenChat from './components/RejectedInfo/OpenChat';
import ReProfileImage from './components/RejectedInfo/ReProfileImage';
import { useCounter } from '../../../commons/store/useCounter';

const FailedSign: React.FC<Props> = ({ route }) => {
  useManageMargin();
  const { movePage } = useMovePage();
  const rejectCase = route.params?.rejectCase;
  console.log('rejectCase', rejectCase);
  const { count, increment } = useCounter();
  console.log('count', count);
  useEffect(() => {
    console.log('count, rejectCase', count, rejectCase.length * 2);
    if (count === rejectCase.length * 2) movePage('waitConfirm')();
  }, [count]);

  return (
    <>
      {/* 첫번째 승인 거부 케이스 */}
      {count === 0 && <RejectedInfo rejectCase={rejectCase[0]} />}
      {count === 1 &&
        ((rejectCase[0] === 0 && <StudentID />) ||
          ((rejectCase[0] === 1 || rejectCase[0] === 2) && <OpenChat />) ||
          (rejectCase[0] === 3 && <ReProfileImage />))}

      {/* 두번째 승인 거부 케이스 */}
      {count === 2 && <RejectedInfo rejectCase={rejectCase[1]} />}
      {count === 3 &&
        (((rejectCase[1] === 1 || rejectCase[1] === 2) && <OpenChat />) || (rejectCase[1] === 3 && <ReProfileImage />))}

      {/* 세번째 승인 거부 케이스 */}
      {count === 4 && <RejectedInfo rejectCase={rejectCase[2]} />}
      {count === 5 && rejectCase[2] === 3 && <ReProfileImage />}
    </>
  );
};

export default FailedSign;
