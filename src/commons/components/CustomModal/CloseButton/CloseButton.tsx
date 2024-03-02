import { Image, TouchableOpacity } from 'react-native';
import * as S from './CloseButton.styles';
import { IProps } from './CloseButton.types';

export const CloseButton: React.FC<IProps> = ({ onClose }) => {
  return (
    <S.TopWrapper>
      <TouchableOpacity onPress={onClose}>
        <Image source={require('../../../../../assets/images/icons/close.png')} />
      </TouchableOpacity>
    </S.TopWrapper>
  );
};
