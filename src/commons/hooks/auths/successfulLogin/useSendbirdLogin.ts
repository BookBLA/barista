import { MMKV } from 'react-native-mmkv';

import { LoginResponse } from '@commons/types/openapiGenerator';
import useToastStore from '@commons/store/ui/toast/useToastStore';

import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import SendbirdChat, { CachedDataClearOrder, LocalCacheConfig, SendbirdChatParams } from '@sendbird/chat';

export const useSendbirdLogin = () => {
  const showToast = useToastStore((state) => state.showToast);

  const params: SendbirdChatParams<[GroupChannelModule]> = {
    appId: `${process.env.EXPO_PUBLIC_SENDBIRD_APP_ID}`,
    localCacheEnabled: true,
    useMMKVStorageStore: new MMKV(),
    localCacheConfig: new LocalCacheConfig({
      maxSize: 256,
      clearOrder: CachedDataClearOrder.MESSAGE_COLLECTION_ACCESSED_AT,
    }),
    modules: [new GroupChannelModule()],
  };
  const sb: SendbirdChat = SendbirdChat.init(params);

  const handleSendbirdLogin = async (result: LoginResponse) => {
    try {
      const user = await sb.connect(String(result.memberId));
    } catch (error) {
      console.error(error);
      showToast({
        content: '채팅 서버에 연결할 수 없습니다.',
      });
    }
  };

  const handleSendbirdLogout = async () => {
    try {
      await sb.disconnect();
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSendbirdLogin, handleSendbirdLogout };
};
