import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { colors } from '@commons/styles/variablesStyles';
import * as S from '@screens/Setting/SettingStack.styles';
import { useEffect } from 'react';
import { matchingContents } from './MachingContent.contents';
import { TextBox } from './MatchingContent.styles';
import { IProps } from './MatchingContent.types';

const MatchingContent = ({ reason, selected, setSelected, setReason }: IProps) => {
  useEffect(() => {
    if (reason) {
      setSelected('');
    }
  }, [reason]);

  return (
    <S.ModalWrapper>
      <CustomText margin="0 0 14px">어떤 이유로 비활성화하시나요?</CustomText>
      {matchingContents.map((el) => (
        <CustomButton
          key={el}
          contents={el}
          onPress={() => {
            setSelected(el);
            setReason('');
          }}
          backgroundColor={selected === el ? colors.primary : colors.buttonMain}
          fontColor={selected === el ? colors.textYellow : 'black'}
          textAlign="flex-start"
          margin="16px 0 0 0"
        />
      ))}
      <TextBox
        value={reason}
        onChangeText={(text: string) => {
          setReason(text);
        }}
        placeholder="기타) 직접 작성"
      />
    </S.ModalWrapper>
  );
};

export default MatchingContent;
