import { ImageSourcePropType } from 'react-native';

export interface FavBookListProps {
  representative?: boolean;
  memberBookId: string;
  imageUrl: ImageSourcePropType | undefined;
  fetchGetMemberBook: () => Promise<void>;
}
