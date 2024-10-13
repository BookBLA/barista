import React from 'react';

import useToastStore from '@commons/store/ui/toast/useToastStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import Spinner from '@commons/components/Layouts/Spinner/Spinner';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';

import { useConnection } from '@sendbird/uikit-react-native';

export const SignInScreen = () => {
  const showToast = useToastStore((state) => state.showToast);

  const { connect } = useConnection();
  const memberId = useMemberStore((state) => state.memberInfo.id);
  const sendbirdToken = useAuthStore((state) => state.sendbirdToken);
  console.debug(memberId, typeof memberId, sendbirdToken, typeof sendbirdToken);

  if (memberId) {
    connect(memberId.toString(), { accessToken: sendbirdToken });
  } else {
    showToast({
      content: '채팅 서버에 접속할 수 없습니다.\n다시 시도하거나 로그아웃 후 다시 로그인해주세요.',
    });
  }

  return <Spinner />;
};
