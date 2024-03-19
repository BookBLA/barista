import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import * as S from './Error.styles';
import Bang from '../../../../../assets/images/icons/Bang.png';
import { colors } from '../../../../commons/styles/variablesStyles';

const Error = () => {
  return (
    <S.ErrorWrapper>
      <S.BangImage source={Bang} />
      <CustomText size="14px" color={colors.primary}>
        죄송합니다. 같은 책을 좋아하는 사람이 없습니다.
      </CustomText>
      <CustomText size="14px" color={colors.primary}>
        책을 추가로 등록해 보는건 어떨까요?
      </CustomText>
    </S.ErrorWrapper>
  );
};

export default Error;
