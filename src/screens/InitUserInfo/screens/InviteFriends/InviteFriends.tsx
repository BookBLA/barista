import { getSchoolMembers } from '@commons/api/schools/school.api';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import * as S from '../../InitUserInfo.styles';

const imgUrl = {
  1: img.heartGauge1,
  2: img.heartGauge2,
  3: img.heartGauge3,
  4: img.heartGauge4,
  5: img.heartGauge5,
  6: img.heartGauge6,
  7: img.heartGauge7,
};

const InviteFriends = () => {
  const showToast = useToastStore((state) => state.showToast);
  useManageMargin();
  useHeaderControl({
    title: '친구 초대',
    left: false,
  });

  const [heartImage, setHeartImage] = useState(1);
  const [schoolData, setSchoolData] = useState({
    currentMemberCount: 0,
    goalMemberCount: 30,
    percentage: 0,
    schoolName: '',
    invitationCode: '',
  });

  const setHeartGauge = (currentMemberCount: number) => {
    setHeartImage(Math.floor(currentMemberCount / 5 + 1));
  };

  const callGetSchoolMembersApi = async () => {
    try {
      const response = await getSchoolMembers();
      setSchoolData((prev) => ({ ...prev, ...response?.result }));
      setHeartGauge(response.result.currentMemberCount!);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callGetSchoolMembersApi();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(schoolData.invitationCode);
    showToast({
      content: '코드가 복사되었습니다',
    });
  };

  return (
    <S.Wrapper>
      <View style={{ width: '100%', alignItems: 'center', marginTop: '34%' }}>
        <S.ContentStyled style={{ marginBottom: 5 }}>{schoolData.schoolName} </S.ContentStyled>
        <S.ContentStyled>친구를 초대해봐요!</S.ContentStyled>
        <Text
          style={{
            color: colors.textGray2,
            fontFamily: 'fontMedium',
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 30,
          }}
        >
          같은 학교 남녀 학생이 30명씩 모이면 오픈됩니다
        </Text>
        <S.InviteFriendsContainer>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column' }}>
              <CustomText size="12px" font="fontExtraBold" color={colors.textGray3} style={{ marginBottom: 14 }}>
                <CustomText size="12px" font="fontExtraBold" color={colors.textGray5} style={{ marginBottom: 14 }}>
                  {schoolData.currentMemberCount}명
                </CustomText>
                {` / ${schoolData.goalMemberCount}명`}
              </CustomText>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText size="22px" font="fontBold" color={colors.primary}>
                  {schoolData.percentage}%
                </CustomText>
                <CustomText size="16px" font="fontRegular" color={colors.textGray3}>
                  {' 모집완료'}
                </CustomText>
              </View>
            </View>
            <Image source={imgUrl[heartImage]} style={{ width: 86, height: 86 }} />
          </View>
          <CustomText size="12px" font="fontMedium" color={colors.textGray3} style={{ marginBottom: 6 }}>
            아래 코드를 공유하고 친구를 초대하세요
          </CustomText>
          <S.InviteCodeContainer>
            <CustomText size="30px" font="fontSemiBold" color={colors.primary}>
              {schoolData.invitationCode}
            </CustomText>
          </S.InviteCodeContainer>
          <CustomText size="12px" font="fontMedium" color={colors.textGray4} style={{ lineHeight: 22 }}>
            친구를 초대하면{'\n'}친구도 나도 최대
            <CustomText size="12px" font="fontBold" color={colors.primary} style={{ lineHeight: 22 }}>
              {' 책갈피 70개'}
            </CustomText>
            지급!{'\n'}책갈피는 매칭 신청과 수락할 때 사용됩니다
          </CustomText>
        </S.InviteFriendsContainer>
      </View>
      <S.NextButtonStyled onPress={copyToClipboard} height={44}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>코드 복사하기</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default InviteFriends;
