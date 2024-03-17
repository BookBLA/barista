import { CustomText } from '../../commons/components/TextComponents/CustomText/CustomText';
import { LightText } from '../../commons/components/TextComponents/LightText/LightText';
import { colors } from '../../commons/styles/variablesStyles';
import * as S from './Setting.styles';
import Matching from '../../../assets/images/icons/MatchingTransparent.png';
import Support from '../../../assets/images/icons/SupportTransparent.png';
import Library from '../../../assets/images/icons/LibraryTransparent.png';
import useManageMargin from '../../commons/hooks/useManageMargin';

const Setting = () => {
  useManageMargin();

  return (
    <S.Wrapper>
      <S.ProfileWrapper>
        <S.LeftWrapper></S.LeftWrapper>
        <S.RightWrapper>
          <CustomText>성이름 | 00살</CustomText>
          <LightText>가천대학교</LightText>
        </S.RightWrapper>
      </S.ProfileWrapper>
      <S.MenuWrapper>
        <S.MenuBox>
          <S.MenuImage source={Library} />
          <CustomText color={colors.primary}>내 서재</CustomText>
        </S.MenuBox>
        <S.MenuBox>
          <S.MenuImage source={Matching} />
          <CustomText color={colors.primary}>매칭</CustomText>
        </S.MenuBox>
        <S.MenuBox>
          <S.MenuImage source={Support} />
          <CustomText color={colors.primary}>고객센터</CustomText>
        </S.MenuBox>
      </S.MenuWrapper>
      <S.Line />
      <S.BottomWrapper>
        <CustomText margin="16px 0">계정</CustomText>
        <CustomText margin="16px 0">약관 및 정책</CustomText>
        <CustomText margin="16px 0">아는 사람 피하기</CustomText>
        <CustomText margin="16px 0">이벤트 및 공지사항</CustomText>
        <S.BetweenWrapper>
          <S.RowWrapper>
            <CustomText margin="0 5px 0 0">현재 버전</CustomText>
            <CustomText color={colors.textGray2}>V1.00.1</CustomText>
          </S.RowWrapper>
          <CustomText color={colors.textGray2} size="12px">
            최신 버전
          </CustomText>
        </S.BetweenWrapper>
      </S.BottomWrapper>
    </S.Wrapper>
  );
};

export default Setting;
