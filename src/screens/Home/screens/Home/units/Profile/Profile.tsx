import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { example, icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './Profile.styles';

const Profile = () => {
  // TODO: 프로필 컴포넌트 공용화 예정

  return (
    <S.Wrapper>
      <S.LeftWrapper>
        <S.ProfileImage source={example.book} />
      </S.LeftWrapper>
      <S.RightWrapper>
        <S.InfoWrapper>
          <CustomText>이름 | 나이</CustomText>
          <S.GenderWrapper>
            <S.GenderImage source={icons.man} />
          </S.GenderWrapper>
        </S.InfoWrapper>

        <CustomText size="12px" font="fontRegular">
          가천대학교
        </CustomText>
      </S.RightWrapper>
    </S.Wrapper>
  );
};

export default Profile;
