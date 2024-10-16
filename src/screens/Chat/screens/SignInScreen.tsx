import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';

import useToastStore from '@commons/store/ui/toast/useToastStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import Spinner from '@commons/components/Layouts/Spinner/Spinner';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import { colors } from '@commons/styles/variablesStyles';
import { postSendbird } from '@commons/api/auth/login.api';

import { useConnection } from '@sendbird/uikit-react-native';
import { debounce } from 'lodash';

export const SignInScreen = () => {
  const showToast = useToastStore((state) => state.showToast);
  const setToken = useAuthStore((state) => state.setToken);

  const { connect } = useConnection();
  const memberId = useMemberStore((state) => state.memberInfo.id);
  const sendbirdToken = useAuthStore((state) => state.sendbirdToken);
  console.debug(memberId, typeof memberId, sendbirdToken, typeof sendbirdToken);
  useEffect(() => {
    if (memberId) {
      connect(memberId.toString(), { accessToken: sendbirdToken });
    } else {
      showToast({
        content: '채팅 서버에 접속할 수 없습니다.',
      });
    }
  }, []);

  const reConnectSendbirdServer = debounce(async () => {
    const res = await postSendbird();
    const id = res.result.memberId;
    const token = res.result.sendbirdToken;
    if (id && token) {
      setToken({ sendbird: token });
      await connect(id.toString(), { accessToken: token });
    }
  }, 300);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center', color: colors.buttonPrimary }}>채팅 서버에 연결중입니다.</Text>
      <Button title="재시도" onPress={reConnectSendbirdServer} />
      <Spinner />
    </View>
  );
};
