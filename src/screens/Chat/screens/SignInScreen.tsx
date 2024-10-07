import React from 'react';

import useToastStore from '@commons/store/ui/toast/useToastStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import Spinner from '@commons/components/Layouts/Spinner/Spinner';

import { useConnection } from '@sendbird/uikit-react-native';

export const SignInScreen = () => {
  const showToast = useToastStore((state) => state.showToast);

  const { connect, reconnect } = useConnection();
  const memberId = useMemberStore((state) => state.memberInfo.id);
  const memberName = useMemberStore((state) => state.memberInfo.name);
  // TODO - 한결: Sendbird accessToken 생성 -> 로그인
  // const accessToken = useAuthStore((state) => state.token);
  console.debug(memberId, typeof memberId, memberName, typeof memberName);

  if (memberId) {
    connect(memberId.toString() /*{ accessToken: result.accessToken }*/);
  } else {
    showToast({
      content: '채팅 서버에 접속할 수 없습니다.\n다시 시도하거나 앱을 종료 후 재실행해주세요.',
    });
  }

  return <Spinner />;
};
