import { BackHeader } from './BackHeader/BackHeader';
import { IProps } from './CustomHeader.types';

export const CustomHeader =
  <P extends object>(Component: React.ComponentType<P>, { title }: IProps) =>
  (props: React.ComponentProps<typeof Component>) => (
    <>
      {title && <BackHeader title={title} />}
      <Component {...props} />
    </>
  );
