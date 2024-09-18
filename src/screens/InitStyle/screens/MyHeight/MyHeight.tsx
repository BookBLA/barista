import notYetNextButton from '@assets/images/buttons/NotYetNextButton.png';
import nextButton from '@assets/images/buttons/nextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useStyleStore } from '@commons/store/members/style/useStyle';
import { colors } from '@commons/styles/variablesStyles';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { useState } from 'react';
import { Image, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const MyHeight = () => {
  useHeaderControl({
    title: '스타일',
    left: false,
  });
  useAppUIManager();
  const { updateStyleInfo, styleInfo } = useStyleStore();
  const { movePage } = useMovePage();
  const [height, setHeight] = useState<number | ''>(styleInfo.height);

  const handleChange = (input: string) => {
    const sanitizedInput = input.replace(/[^0-9]/g, '');
    const parsedInput = sanitizedInput === '' ? '' : parseInt(sanitizedInput);
    setHeight(parsedInput);
    updateStyleInfo('height', parsedInput);
  };

  return (
    <S.Wrapper>
      {/* <TitleProgress gauge={83} /> */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            height: '100%',
            alignItems: 'center',
          }}
        >
          <View style={{ width: '100%', alignItems: 'center', marginTop: '34%' }}>
            <S.ContentStyled style={{ marginBottom: 38 }}>키를 알려주세요</S.ContentStyled>
            <S.TextFiledStyled
              maxLength={3} // 최대 길이 제한
              defaultValue={styleInfo.height !== 0 ? styleInfo.height.toString() : ''}
              onChangeText={(text: string) => handleChange(text)}
              placeholder="nnn cm"
              placeholderTextColor={colors.textGray2}
              value={height !== 0 ? height.toString() : ''}
              keyboardType="numeric"
            />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {styleInfo.height < 140 || styleInfo.height > 230 ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={movePage('selectProfile')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};
export default MyHeight;
