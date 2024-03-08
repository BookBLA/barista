import useMovePage from '../../../commons/hooks/useMovePage';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../../InitStyle/InitStyle.styles';
import * as U from '../InitBook.styles';
import { Text, Image, TouchableHighlight, Keyboard, View } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import { useState } from 'react';
import answerA from '../../../../assets/images/icons/AnswerA.png';
import answerB from '../../../../assets/images/icons/AnswerB.png';
import answerC from '../../../../assets/images/icons/AnswerC.png';
import { deviceHeight } from '../../../commons/utils/dimensions';

const InitQuiz = () => {
  const [comment, setComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isActivate, setIsActivate] = useState<boolean>(false);
  const { movePage } = useMovePage();

  const handleFocus = () => {
    if (!isFocused) {
      setComment(''); // Clear the text when the TextInput is focused for the first time
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    if (comment === '') {
      setComment('');
      setIsFocused(false);
    }
  };

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>나미야 잡화점의 기적</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <TouchableHighlight
        style={{
          height: deviceHeight * 0.75,
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={Keyboard.dismiss}
        underlayColor="transparent"
      >
        <View style={{ height: '100%', width: '100%', alignItems: 'center' }}>
          <>
            <S.ContentStyled style={{ marginTop: 30, marginBottom: 38, fontSize: 18 }}>
              책 한줄 감상문 남기기
            </S.ContentStyled>
            <U.TextFiledStyled
              value={comment}
              onChangeText={setComment}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                color: colors.primary,
              }}
            />
          </>
          <U.BoundaryStyled />
          <View style={{ height: deviceHeight * 0.5, width: '100%', alignItems: 'center' }}>
            <S.ContentStyled style={{ marginBottom: 26, fontSize: 18 }}>독서퀴즈</S.ContentStyled>
            <U.QuizTextFiledStyled style={{ height: 'auto', marginBotom: 32 }}>
              {/* <Text style={{ fontFamily: 'fontExtraLight', fontSize: 20, color: colors.primary }}>Q</Text> */}
            </U.QuizTextFiledStyled>
            <U.RowStyled>
              <Image source={answerA} style={{ width: 32, height: 32 }} />
              <U.QuizTextFiledStyled />
            </U.RowStyled>
            <U.RowStyled>
              <Image source={answerB} style={{ width: 32, height: 32 }} />
              <U.QuizTextFiledStyled />
            </U.RowStyled>
            <U.RowStyled>
              <Image source={answerC} style={{ width: 32, height: 32 }} />
              <U.QuizTextFiledStyled />
            </U.RowStyled>
          </View>
        </View>
      </TouchableHighlight>
      {isActivate === false ? (
        <S.NextButtonStyled style={{ backgroundColor: '#BBBFCF' }}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>등록하기</Text>
        </S.NextButtonStyled>
      ) : (
        <S.NextButtonStyled onPress={movePage('initQuiz')}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>등록하기</Text>
        </S.NextButtonStyled>
      )}
    </S.Wrapper>
  );
};
export default InitQuiz;
