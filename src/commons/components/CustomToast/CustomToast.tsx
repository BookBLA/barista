import { CustomText } from '../TextComponents/CustomText/CustomText';
import * as S from './CustomToast.styles';

const CustomToast = ({ text = '' }: { text?: string }) => {
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
