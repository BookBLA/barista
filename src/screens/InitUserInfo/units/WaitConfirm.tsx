import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Linking, ActivityIndicator } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import optionA from '../../../../assets/images/icons/OptionA.png';
import optionB from '../../../../assets/images/icons/OptionB.png';
import { LightText } from '../../../commons/components/TextComponents/LightText/LightText';
import Spinner from '../../../commons/components/Spinner/Spinner';
import useMovePage from '../../../commons/hooks/useMovePage';
import {
  getMemberProfileStatusesApi,
  postMemberProfileApi,
} from '../../../commons/api/members/profile/memberProfile.api';
import useManageMargin from '../../../commons/hooks/useManageMargin';
import { useUserStore } from '../../../commons/store/useUserinfo';
import { TitleProgress } from './TitleProgress';
import useHeaderControl from '../../../commons/hooks/useHeaderControl';
import useToastStore from '../../../commons/store/useToastStore';

const WaitConfirm = () => {
  useHeaderControl({
    title: '프로필',
    left: false,
  });
  const showToast = useToastStore((state) => state.showToast);
  const [loading, setLoading] = useState(true);
  const [rejectList, setRejectList] = useState([]);

  const { updateUserInfo, userInfo } = useUserStore();
  useManageMargin();

  const addValueToList = (NewValue: number) => {
    // Adding a new value to the list using setRejectList
    setRejectList((prevList) => [...prevList, NewValue]);
  };

  const { movePage } = useMovePage();

  // Simulating loading with useEffect
  useEffect(() => {
    if (loading) {
      memberStatus();
    } else {
      if (rejectList.length > 0) {
        //거절 된 것이 있으면 failedSign으로 이동
        movePage('failedSign', { rejectCase: rejectList })();
        console.log('failedSign', rejectList);
      } else {
        movePage('completePage')();
      }
    }
  }, [loading]);

  const memberStatus = async () => {
    await callGetMemberProfileStatusApi();
  };

  const callGetMemberProfileStatusApi = async () => {
    try {
      const response = await getMemberProfileStatusesApi();
      console.log('callGetMemberProfileStatusApi', response.result);
      const { studentIdImageStatus, openKakaoRoomUrlStatus, profileImageUrlStatus } = response.result;
      console.log('status', studentIdImageStatus, openKakaoRoomUrlStatus, profileImageUrlStatus);

      if (
        studentIdImageStatus === 'PENDING' ||
        openKakaoRoomUrlStatus === 'PENDING' ||
        profileImageUrlStatus === 'PENDING'
      ) {
        showToast({
          content: '한 개 이상 승인 대기중',
        });
        return;
      }

      if (studentIdImageStatus === 'DENIAL') addValueToList(0);
      if (openKakaoRoomUrlStatus === 'INACCESSIBLE') addValueToList(1);
      if (openKakaoRoomUrlStatus === 'NOT_DEFAULT') addValueToList(2);
      if (profileImageUrlStatus === 'DENIAL') addValueToList(3);
      // console.log('list:', rejectList);

      setLoading(false); //로딩 끝
    } catch (error) {
      console.log('callGetMemberProfileStatusApi error', error);
    }
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={75} />
      <S.ColumnStyled style={{ height: '90%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Spinner />
          <S.ContentStyled>프로필을 확인하고 있어요!{'\n'}1시간 이내로 처리 됩니다!</S.ContentStyled>
          <S.RoundRectStyled
            style={{
              width: '80%',
              height: 'auto',
              paddingTop: 20,
              paddingLeft: 26,
              paddingBottom: 20,
              paddingRight: 26,
            }}
          >
            <View style={{ alignItems: 'flex-start' }}>
              <LightText size="16" color="black">
                기다리시는 동안 인스타그램과 카카오톡 채널 팔로우 부탁드려요!
              </LightText>

              <TouchableOpacity
                style={{ marginTop: 26 }}
                onPress={() => Linking.openURL('https://www.instagram.com/bookbla_kr')}
              >
                <S.RowStyled style={{ alignItems: 'center', justifyContent: 'flex-start', width: 'auto' }}>
                  <Image source={optionA} style={{ width: 30, height: 30 }} />
                  <S.TextStyled style={{ color: colors.textLinkBlue, marginLeft: 14 }}>
                    인스타그램 팔로우하기
                  </S.TextStyled>
                </S.RowStyled>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => Linking.openURL('http://pf.kakao.com/_NrxbnG')}
              >
                <S.RowStyled style={{ alignItems: 'center', justifyContent: 'flex-start', width: 'auto' }}>
                  <Image source={optionB} style={{ width: 30, height: 30 }} />
                  <S.TextStyled style={{ color: colors.textLinkBlue, marginLeft: 14 }}>
                    카카오톡 채널 친구 추가하기
                  </S.TextStyled>
                </S.RowStyled>
              </TouchableOpacity>
              {/* <S.NextButtonStyled onPress={movePage('completePage')}>
                <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>시작하기</Text>
              </S.NextButtonStyled> */}
            </View>
          </S.RoundRectStyled>
        </View>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};

export default WaitConfirm;
