import { RouteProp } from '@react-navigation/native';

export type ProfileProps = {
  ModifyProfile?: { profileId: number };
};
export type Props = RouteProp<ProfileProps, 'ModifyProfile'>;
