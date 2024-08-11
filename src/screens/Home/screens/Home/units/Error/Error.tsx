import { CustomText } from '../../../../../../commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import { colors } from '../../../../../../commons/styles/variablesStyles';
import { icons } from '../../../../../../commons/utils/ui/variablesImages/variablesImages';
import * as S from './Error.styles';

const Error = () => {
  return (
    <S.ErrorWrapper>
      <S.BangImage source={icons.bang} />
      <CustomText size="14px" color={colors.primary} margin="20px 0 0">
        죄송합니다. 같은 책을 좋아하는 사람이 없습니다.
      </CustomText>
      <CustomText size="14px" color={colors.primary}>
        책을 추가로 등록해 보는건 어떨까요?
      </CustomText>
    </S.ErrorWrapper>
  );
};

export default Error;
