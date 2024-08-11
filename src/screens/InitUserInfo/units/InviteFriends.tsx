import { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import useMovePage from '../../../commons/hooks/navigations/movePage/useMovePage';
import { deviceHeight } from '../../../commons/utils/ui/dimensions/dimensions';
import { TitleProgress } from './TitleProgress';
import { CustomText } from '../../../commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import HeartGuage from './components/HeartGuage/HeartGuage';
import { getSchoolMembers } from '../../../commons/api/schools/school.api';
import * as Clipboard from 'expo-clipboard';
import { img } from '../../../commons/utils/ui/variablesImages/variablesImages';
import useManageMargin from '../../../commons/hooks/ui/manageMargin/useManageMargin';
import useHeaderControl from '../../../commons/hooks/ui/headerControl/useHeaderControl';

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
  const { movePage } = useMovePage();
  useManageMargin();
  useHeaderControl({
    title: '친구 초대',
    left: false,
  });

  const [code, setCode] = useState('');
  const [currentMemberCount, setCurrentMemberCount] = useState(0);
  const [goalMemberCount, setGoalMemberCount] = useState(30);
  const [percentage, setPercentage] = useState(0);
  const [schoolName, setSchoolName] = useState('');
  const [heartImage, setHeartImage] = useState(1);

  const setHeartGauge = (currentMemberCount: number) => {
    setHeartImage(Math.floor(currentMemberCount / 5 + 1));
  };

  const callGetSchoolMembersApi = async () => {
    try {
      const response = await getSchoolMembers();
      setCurrentMemberCount(response.result.currentMemberCount);
      setGoalMemberCount(response.result.goalMemberCount);
      setPercentage(response.result.percentage);
      setSchoolName(response.result.schoolName);
      setCode(response.result.invitationCode || 'undefined');
      setHeartGauge(response.result.currentMemberCount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callGetSchoolMembersApi();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(code);
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={75} />
      <S.ColumnStyled style={{ height: '90%', alignItems: 'center', justifyContent: 'center' }}>
        <S.ContentStyled style={{ marginBottom: 5 }}>{schoolName} </S.ContentStyled>
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
                  {currentMemberCount}명
                </CustomText>
                {` / ${goalMemberCount}명`}
              </CustomText>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText size="22px" font="fontBold" color={colors.primary}>
                  {percentage}%
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
              {code}
            </CustomText>
          </S.InviteCodeContainer>
          <CustomText size="12px" font="fontMedium" color={colors.textGray4} style={{ lineHeight: 22 }}>
            여자인 친구 초대하면{'\n'}친구도 나도
            <CustomText size="12px" font="fontBold" color={colors.primary} style={{ lineHeight: 22 }}>
              {' 책갈피 100개'}
            </CustomText>
            지급!{'\n'}책갈피는 매칭 신청과 수락할 때 사용됩니다
          </CustomText>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.ButtonStyled
              onPress={copyToClipboard}
              style={{ height: 44, width: 208, backgroundColor: colors.primary, marginTop: 26 }}
            >
              <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>코드 복사하기</Text>
            </S.ButtonStyled>
          </View>
        </S.InviteFriendsContainer>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};

export default InviteFriends;
