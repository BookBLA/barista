import { MainView } from './CustomScreen.styles';

export const CustomScreen =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: React.ComponentProps<typeof Component>) => (
    <MainView>
      <Component {...props} />
    </MainView>
  );
