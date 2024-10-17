import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { FontLoader } from './src/commons/components/Feedbacks/FontLoader/FontLoader';
import GlobalErrorModal from './src/commons/components/Feedbacks/GlobalErrorModal/GlobalErrorModal';
import { CustomNavigator } from './src/commons/components/Navigations/CustomNavigator/CustomNavigator';
import toastConfig from './src/commons/configs/toast/toastConfig';

// import { INJECTED_JAVASCRIPT } from './src/screens/Login/LoginStack.constants';

import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UpdateModal from './src/commons/components/Feedbacks/UpdateModal/UpdateModal';

import queryClient from './src/commons/configs/queryClient/queryClient';
import { useInitializeApp } from './src/commons/hooks/appStatus/useInitializeApp';
import useToast from './src/commons/hooks/utils/toast/useToast';
import { useAppStatus } from './src/commons/store/ui/appStatus/useAppStatus';
import { platformServices } from './src/screens/Chat/NativeModule';
import { SendbirdUIKitContainer, TypingIndicatorType } from '@sendbird/uikit-react-native';
import { MMKV } from 'react-native-mmkv';
import { StringSets } from './src/screens/Chat/options/StringOptions';
import { UseReactNavigationHeader } from './src/screens/Chat/options/UseReactNavigationHeader';
import { Theme } from './src/screens/Chat/options/Theme';
import usePushNotifications from './src/commons/hooks/notifications/pushNotifications/usePushNotifications';

export default function App() {
  useInitializeApp();
  useToast();
  usePushNotifications();
  const mmkv = new MMKV();
  const backgroundColor = useAppStatus((state) => state.status.isBackgroundColor);
  const isLight = backgroundColor !== '#fff' ? 'light' : 'dark';
  // Core.initializeKakaoSDK(`${process.env.EXPO_PUBLIC_NATIVE_APP_KEY}`, {
  //   web: {
  //     javascriptKey: INJECTED_JAVASCRIPT,
  //     restApiKey: `${process.env.EXPO_PUBLIC_REST_API_KEY}`,
  //   },
  // });

  return (
    <FontLoader>
      <QueryClientProvider client={queryClient}>
        <SendbirdUIKitContainer
          appId={`${process.env.EXPO_PUBLIC_SENDBIRD_APP_ID}`}
          chatOptions={{ localCacheStorage: mmkv, enableAutoPushTokenRegistration: true }}
          platformServices={platformServices}
          localization={{ stringSet: StringSets['ko'] }}
          uikitOptions={{
            groupChannel: {
              enableTypingIndicator: true,
              typingIndicatorTypes: new Set([TypingIndicatorType.Bubble, TypingIndicatorType.Text]),
              replyType: 'quote_reply',
              enableReactions: true,
            },
            groupChannelList: {
              enableTypingIndicator: true,
              enableMessageReceiptStatus: true,
            },
          }}
          styles={{ HeaderComponent: UseReactNavigationHeader, theme: Theme, defaultHeaderTitleAlign: 'left' }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <UpdateModal />
            <BottomSheetModalProvider>
              <SafeAreaProvider style={{ flex: 1 }}>
                <StatusBar style={isLight} translucent />
                <CustomNavigator />
              </SafeAreaProvider>
              <GlobalErrorModal />
            </BottomSheetModalProvider>
            <Toast config={toastConfig} />
          </GestureHandlerRootView>
        </SendbirdUIKitContainer>
      </QueryClientProvider>
    </FontLoader>
  );
}
