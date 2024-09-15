import { RouteProp } from '@react-navigation/native';

export type ChatInfoScreenParams = {
  user: {
    id: string;
    nickname: string;
    avatar: string;
  };
};

export type ChatInfoScreenProps = {
  route: RouteProp<Record<string, ChatInfoScreenParams>, string>;
};
