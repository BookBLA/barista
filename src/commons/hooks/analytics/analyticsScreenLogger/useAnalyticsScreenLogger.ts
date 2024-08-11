import { useEffect } from 'react';
import analytics from '@react-native-firebase/analytics';
import { useNavigationState } from '@react-navigation/native';

const useScreenLogger = () => {
  const route = useNavigationState((state) => state.routes[state.index]);

  useEffect(() => {
    if (route) {
      const logScreenView = async () => {
        try {
          await analytics().logScreenView({
            screen_name: route.name,
            screen_class: route.name,
          });
          console.log(`Screen view logged: ${route.name}`);
        } catch (error) {
          console.error(`Failed to log screen view: ${route.name}`, error);
        }
      };

      logScreenView();
    }
  }, [route]);
};

export default useScreenLogger;
