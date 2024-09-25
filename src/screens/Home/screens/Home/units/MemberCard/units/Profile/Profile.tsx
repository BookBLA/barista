import reportIcon from '@assets/images/icons/ReportIconGray.png';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { EGender } from '@screens/Home/screens/Home/Home.types';
import * as S from './Profile.styles';

// TODO: 프로필 컴포넌트 공용화 예정
const Profile = ({ memberData, handleReport }: { handleReport: () => void; memberData: MemberIntroResponse }) => {
  const memberGender = memberData?.memberGender === EGender.MALE ? icons.man : icons.woman;
  return (
    <S.Wrapper>
      <S.LeftContainer>
        <S.LeftWrapper>
          <S.ProfileImage source={{ url: memberData?.memberProfileImageUrl }} />
        </S.LeftWrapper>
        <S.RightWrapper>
          <S.InfoWrapper>
            <CustomText>
              {memberData?.memberName} | {memberData?.memberAge}
            </CustomText>
            <S.GenderWrapper>
              <S.GenderImage source={memberGender} />
            </S.GenderWrapper>
          </S.InfoWrapper>

          <CustomText size="12px" font="fontRegular">
            {memberData?.memberSchoolName}
          </CustomText>
        </S.RightWrapper>
      </S.LeftContainer>
      <S.IconButton onPress={handleReport}>
        <S.ReportIconImage source={reportIcon} />
      </S.IconButton>
    </S.Wrapper>
  );
};

export default Profile;
