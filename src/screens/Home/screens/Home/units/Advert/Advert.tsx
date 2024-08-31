import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './Advert.styles';

const Advert = () => {
  return (
    <S.Wrapper>
      <S.Button>
        <S.RefreshWrapper>
          <S.RefreshImage source={icons.refresh} />
        </S.RefreshWrapper>
        <CustomText color="#fff">새로운 사람 만나기</CustomText>
      </S.Button>
    </S.Wrapper>
  );
};

export default Advert;
