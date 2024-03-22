import { colors } from '../../../commons/styles/variablesStyles';
import { Text, View, Keyboard } from 'react-native';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle.styles';
import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { useState } from 'react';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { deviceHeight } from '../../../commons/utils/dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableHighlight } from '@gorhom/bottom-sheet';
import { useStyleStore } from '../../../commons/store/useStyle';

const PersonalQuestion = () => {
  const [question, setQuestion] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { updateStyleInfo, styleInfo } = useStyleStore();

  const handleFocus = () => {
    if (!isFocused) {
      setQuestion(''); // Clear the text when the TextInput is focused for the first time
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    if (question === '') {
      setQuestion('');
      setIsFocused(false);
    }
  };
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={100} />
      <TouchableHighlight
        style={{
          height: deviceHeight * 0.7,
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
        onPress={Keyboard.dismiss}
        underlayColor="transparent"
      >
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled style={{ marginBottom: 10 }}>상대방에게 궁금한 점을 적어주세요</S.ContentStyled>
          <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14, marginBottom: 10 }}>
            ex) 주로 어디서 책을 읽나요?
          </Text>
          <T.TextFiledStyled
            defaultValue={styleInfo.memberAsk}
            onChangeText={(text: string) => setQuestion(text)}
            //onFocus={handleFocus}
            onBlur={() => updateStyleInfo('memberAsk', question)}
            style={{
              color: colors.primary,
            }}
          />
          <S.RowStyled style={{ justifyContent: 'flex-end', width: '80%' }}>
            <Text
              style={{
                color: colors.textGray2,
                fontFamily: 'fontRegular',
                fontSize: 12,
                marginTop: 5,
              }}
            >
              {question.length}/80자
            </Text>
          </S.RowStyled>
        </View>
      </TouchableHighlight>
      {styleInfo.memberAsk === '' ? (
        <S.NextButtonStyled style={{ backgroundColor: '#BBBFCF' }}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
        </S.NextButtonStyled>
      ) : (
        <S.NextButtonStyled onPress={movePage('initBookStack')}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
        </S.NextButtonStyled>
      )}
    </S.Wrapper>
  );
};
export default PersonalQuestion;
