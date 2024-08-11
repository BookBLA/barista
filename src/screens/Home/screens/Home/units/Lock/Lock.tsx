import { CustomText } from '../../../../../../commons/components/Utils/TextComponents/CustomText/CustomText';
import { icons } from '../../../../../../commons/utils/ui/variablesImages/variablesImages';
import * as S from './Lock.styles';

const Lock = () => {
  return (
    <S.LockWrapper>
      <S.LockImage source={icons.lock} />
      <CustomText font="fontSemiBold">다른 사람의 서재를 구경하려면</CustomText>
      <CustomText font="fontSemiBold" margin="0 0 8px">
        매칭을 활성화 해주세요!
      </CustomText>
      <CustomText font="fontBold">[내 서재] - [설정] - [계정] - [매칭 활성화]</CustomText>
    </S.LockWrapper>
  );
};

export default Lock;
