import { RouteProp } from '@react-navigation/native';

export type ProfileProps = {
  ModifyProfile?: { profileUrl: string };
};
export type Props = RouteProp<ProfileProps, 'ModifyProfile'>;
