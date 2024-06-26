import { CustomButton } from '../../../../../../commons/components/CustomButton/CustomButton';
import { CustomText } from '../../../../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../../../../commons/styles/variablesStyles';
import { IProps } from './MatchingContent.types';
import * as S from '../../../../SettingStack.styles';
import { TextBox } from './MatchingContent.styles';
import { matchingContents } from './MachingContent.contents';
import { useEffect } from 'react';

const MatchingContent = ({ reason, selected, setSelected, setReason }: IProps) => {
  useEffect(() => {
    if (reason) {
      setSelected('');
    }
  }, [reason]);

  return (
    <S.ModalWrapper>
      <CustomText margin="0 0 14px">어떤 이유로 비활성화하시나요?</CustomText>
      {matchingContents.map((el, dex) => (
        <CustomButton
          key={dex}
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
