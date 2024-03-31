import { CustomButton } from '../../../../../../commons/components/CustomButton/CustomButton';
import { CustomText } from '../../../../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../../../../commons/styles/variablesStyles';
import { IProps } from './MatchingContent.types';
import * as S from '../../../../SettingStack.styles';

const contents = [
  '연애를 시작했어요',
  '잠깐 매칭을 쉬고 싶어요',
  '마음에 드는 책이 없어요',
  '알림이 너무 많이 떠요',
  '기타) 직접 작성',
];

const MatchingContent = ({ selected, setSelected }: IProps) => {
  return (
    <S.ModalWrapper>
      <CustomText margin="0 0 14px">어떤 이유로 비활성화하시나요?</CustomText>
      {contents.map((el, dex) => (
        <CustomButton
          key={dex}
          contents={el}
          onPress={() => setSelected(el)}
          backgroundColor={selected === el ? colors.primary : colors.buttonMain}
          fontColor={'black'}
          textAlign={'flex-start'}
          margin={'16px 0 0 0'}
        ></CustomButton>
      ))}
    </S.ModalWrapper>
  );
};

export default MatchingContent;
