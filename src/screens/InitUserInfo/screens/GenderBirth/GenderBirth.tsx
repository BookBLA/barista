import notYetNextButton from '@assets/images/buttons/NotYetNextButton.png';
import nextButton from '@assets/images/buttons/nextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import { getMemberStatusesApi } from '@commons/api/members/default/member.api';
import { postPolicyApi } from '@commons/api/members/policy/memberPolicy';
import { postMemberProfileApi } from '@commons/api/members/profile/memberProfile.api';
import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import { useAgreementStore } from '@commons/store/appStatus/agreement/useAgreement';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { EMemberStatus } from '@commons/types/memberStatus';
import { isAxiosErrorResponse } from '@commons/utils/api/errors/isAxiosErrorResponse/isAxiosErrorResponse';
import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import * as S from '../../InitUserInfo.styles';
import ModalContent from './units/BirthSelect/ModalContent';
import ModalTitle from './units/BirthSelect/ModalTitle';

const GenderBirth = () => {
  useHeaderControl({
    title: '정보 입력',
    left: false,
  });
  useScreenLogger();
  const { isOpen, toggle } = useToggle();
  const { updateUserInfo, userInfo, resetUserInfo } = useUserStore();
  const { resetAgreement } = useAgreementStore();
  const { updateMemberInfo } = useMemberStore();
  const { movePage, handleReset } = useMovePage();
  const [date, setDate] = useState(new Date('2000-01-01'));
  const showToast = useToastStore((state) => state.showToast);

  const dateSelect = () => {
    const dateString = date.toISOString().slice(0, 10);
    updateUserInfo({ birthDate: dateString });
    toggle();
  };

  const modalConfig = {
    title: <ModalTitle />,
    visible: isOpen,
    onClose: toggle,
    close: true,
    mode: 'round',
    contents: <ModalContent date={date} setDate={setDate} />,
    buttons: [
      { label: '취소', action: toggle, color: 'black', bgColor: colors.buttonMain },
      { label: '확인', action: dateSelect, color: colors.secondary },
    ],
  };

  const nextPage = async () => {
    await callPostPolicyApi();
    await callPostMemberProfileAPi();
  };

  const { agreementInfo } = useAgreementStore();

  const callPostPolicyApi = async () => {
    try {
      const response = await postPolicyApi({
        agreedStatuses: {
          adAgreementPolicy: agreementInfo.adAgreementPolicy,
        },
      });
      console.log('약관 등록 성공', response);
    } catch (error) {
      console.log('약관 등록 실패', error);
    }
  };
  const callPostMemberProfileAPi = async () => {
    try {
      console.log('userInfo', userInfo);
      const response = await postMemberProfileApi({
        name: userInfo.name,
        birthDate: userInfo.birthDate,
        gender: userInfo.gender,
        schoolName: userInfo.schoolName,
        schoolEmail: userInfo.schoolEmail,
      });
      console.log('프로필 등록 성공', response);
      resetUserInfo();
      resetAgreement();
      updateMemberInfo('memberStatus', EMemberStatus.STYLE);
      //schoolStatus Get api 호출
      //schoolStatus가 "OPEN"이면 completePage로 이동
      const schoolStatusResponse = await getMemberStatusesApi();
      const schoolStatus = schoolStatusResponse.result?.schoolStatus;
      console.log('schoolStatus', schoolStatus);
      if (schoolStatus === 'OPEN') {
        handleReset('completePage');
      } else if (schoolStatus === 'CLOSED') {
        handleReset('inviteFriends');
      }
    } catch (error) {
      if (!isAxiosErrorResponse(error)) return;
      console.log('프로필 등록 실패', error);
      showToast({
        content: error.response.data.message,
      });
    }
  };

  return (
    <S.Wrapper>
      {/* <TitleProgress gauge={75} /> */}
      <S.ColumnStyled style={{ marginTop: '34%', justifyContent: 'center', height: 'auto' }}>
        <S.ViewStyled style={{ marginBottom: 95 }}>
          <S.ContentStyled style={{ textAlign: 'center', marginBottom: 8 }}>성별을 선택해 주세요.</S.ContentStyled>
          <Text
            style={{
              color: colors.textGray2,
              fontFamily: 'fontLight',
              fontSize: 12,
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            프로필 확인 후 거짓 사실이 확인되면{'\n'}
            <Text style={{ color: colors.textGray2, fontFamily: 'fontBold' }}>영구정지 처리 및 불이익</Text>이 발생할 수
            있습니다.
          </Text>
          <S.RowStyled>
            <S.BooleanButtonStyled
              isSelect={userInfo.gender === 'FEMALE'}
              onPress={() => updateUserInfo({ gender: 'FEMALE' })}
            >
              <S.ButtonTextStyled isSelect={userInfo.gender === 'FEMALE'}>여성</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
            <S.BooleanButtonStyled
              isSelect={userInfo.gender === 'MALE'}
              onPress={() => updateUserInfo({ gender: 'MALE' })}
            >
              <S.ButtonTextStyled isSelect={userInfo.gender === 'MALE'}>남성</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
          </S.RowStyled>
        </S.ViewStyled>
        <S.ViewStyled>
          <S.ContentStyled>생년월일을 선택해 주세요.</S.ContentStyled>
          <S.ButtonStyled onPress={toggle}>
            <Text
              style={{
                color: userInfo.birthDate === '' ? colors.textGray2 : colors.primary,
                fontFamily: 'fontMedium',
              }}
            >
              {userInfo.birthDate === '' ? 'YYYY/MM/DD' : userInfo.birthDate}
            </Text>
          </S.ButtonStyled>
        </S.ViewStyled>
        <CustomModal modalConfig={modalConfig} />
      </S.ColumnStyled>
      {/* <View
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '85%',
          height: '7%',
        }}
      >
        {userInfo.gender === '' || userInfo.birthDate === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={movePage('namePhone')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </View> */}
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {userInfo.birthDate === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={nextPage}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};

export default GenderBirth;
