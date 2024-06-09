import { Linking } from 'react-native';
export const useLinkingOpen = () => {
  const handleLinkPress = (url: string) => () => Linking.openURL(url);
  return handleLinkPress;
};
