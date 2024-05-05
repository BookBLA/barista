import { CustomText } from '../TextComponents/CustomText/CustomText';
import * as S from './CustomToast.styles';

const CustomToast = ({ text = '' }: { text?: string }) => {
// TODO: 성진 - 불필요한 웨퍼 제거 예정

  return (
    <S.Wrapper>
      <S.InnerWrapper>
        <CustomText color={'#fff'} size="14px">
          {text}
        </CustomText>
      </S.InnerWrapper>
    </S.Wrapper>
  );
};

export default CustomToast;
