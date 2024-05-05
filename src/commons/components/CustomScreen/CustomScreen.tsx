import { MainView } from './CustomScreen.styles';

export const CustomScreen = (Component: React.ComponentType<any>) => (props: object) => (
  <MainView>
    <Component {...props} />
  </MainView>
);
