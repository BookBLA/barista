import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import * as S from './Lock.styles';
import LockIcon from '../../../../../assets/images/icons/Lock.png';

const Lock = () => {
  return (
    <S.LockWrapper>
      <S.LockImage source={LockIcon} />
      <CustomText font="fontSemiBold">다른 사람의 서재를 구경하려면</CustomText>
      <CustomText font="fontSemiBold">매칭을 활성화 해주세요!</CustomText>
      <CustomText font="fontBold">[내 서재] - [설정] - [계정] - [매칭 활성화]</CustomText>
    </S.LockWrapper>
  );
};

export default Lock;
