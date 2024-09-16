import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './Lock.styles';

const Lock = () => {
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      {/* <S.BlurWrapper /> */}
      <S.InnerWrapper>
        <S.ImageWrapper>
          <S.Image source={icons.lock} />
        </S.ImageWrapper>
        <CustomText font="fontSemiBold">다른 사람의 서재를 구경하려면</CustomText>
        <CustomText font="fontSemiBold" margin="0 0 12px">
          매칭을 활성화 해주세요!
        </CustomText>
        <CustomText font="fontMedium" size="14px">
          [내 서재] - [설정] - [계정] - [매칭 활성화]
        </CustomText>
        <S.ButtonWrapper>
          <CustomText
            font="fontSemiBold"
            size="14px"
            color="#fff"
            onPress={movePage('settingStack', {
              screen: 'account',
              params: {},
            })}
          >
            활성화 하러 가기
          </CustomText>
        </S.ButtonWrapper>
      </S.InnerWrapper>
    </S.Wrapper>
  );
};

export default Lock;
