import useMovePage from '../../../commons/hooks/useMovePage';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../../InitStyle/InitStyle.styles';
import * as U from '../InitBook.styles';
import { Text, Image, TouchableHighlight, Keyboard, View, TextInput } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import { useState } from 'react';
import answerA from '../../../../assets/images/icons/AnswerA.png';
import answerB from '../../../../assets/images/icons/AnswerB.png';
import answerC from '../../../../assets/images/icons/AnswerC.png';
import backArrow from '../../../../assets/images/icons/BackArrow.png';
import { deviceHeight, deviceWidth } from '../../../commons/utils/dimensions';
import Dash from 'react-native-dash';
import { TouchableOpacity } from 'react-native-gesture-handler';

const InitQuiz = () => {
  const [comment, setComment] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isActivate, setIsActivate] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [wrongAnswer1, setWrongAnswer1] = useState<string>('');
  const [wrongAnswer2, setWrongAnswer2] = useState<string>('');
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
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', height: '9%' }}>
        <TouchableOpacity onPress={movePage()}>
          <Image source={backArrow} style={{ width: 24, height: 24, marginLeft: 14 }} />
        </TouchableOpacity>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            height: 'auto',
          }}
        >
          <S.TitleStyled>나미야 잡화점의 기적</S.TitleStyled>
        </View>
      </View>
      <S.ColumnStyled style={{ height: '70%' }}>
        <TouchableHighlight
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}
          onPress={Keyboard.dismiss}
          underlayColor="transparent"
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <View style={{ width: '100%', height: '30%', alignItems: 'center' }}>
              <S.ContentStyled style={{ marginBottom: 36, fontSize: 18 }}>책 한 줄 감상문 남기기</S.ContentStyled>
              <U.TextFiledStyled
                value={comment}
                onChangeText={setComment}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                  color: colors.primary,
                }}
              />
              <S.RowStyled style={{ justifyContent: 'flex-end', width: '85%' }}>
                <Text
                  style={{
                    color: colors.textGray2,
                    fontFamily: 'fontRegular',
                    fontSize: 12,
                    marginTop: 5,
                  }}
                >
                  {comment.length}/100자
                </Text>
              </S.RowStyled>
            </View>
            <Dash
              style={{
                width: '85%',
                height: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}
              dashGap={5}
              dashLength={5}
              dashThickness={1.5}
              dashColor={colors.lineDivider}
            />

            <View style={{ height: 'auto', width: '100%', alignItems: 'center' }}>
              <S.ContentStyled style={{ marginTop: 10, marginBottom: 26, fontSize: 18 }}>독서퀴즈</S.ContentStyled>
              {/* <U.QuizTextFiledStyled
                style={{ height: 'auto', marginBottom: 32 }}
                placeholder="책을 읽었는지 확일할 질문을 적어주세요."
                
              >
                <Text style={{ fontFamily: 'fontExtraLight', fontSize: 20, color: colors.primary }}>Q.</Text>
              </U.QuizTextFiledStyled> */}
              <U.QuizStyled style={{ height: 'auto', marginBottom: 32 }}>
                <Text style={{ fontFamily: 'fontExtraLight', fontSize: 20, color: colors.primary }}>Q.</Text>
                <U.QuizTextInput
                  style={{ height: 'auto' }} // Adjust margin as needed
                  placeholder="책을 읽었는지 확인할 질문을 적어주세요."
                  placeholderTextColor={colors.textGray2} // Assuming colors.placeholder is defined
                />
              </U.QuizStyled>
              <U.RowStyled>
                <Image source={answerA} style={{ width: 32, height: 32 }} />
                <U.QuizTextFiledStyled placeholder="정답이 들어갈 영역입니다." />
              </U.RowStyled>
              <U.RowStyled>
                <Image source={answerB} style={{ width: 32, height: 32 }} />
                <U.QuizTextFiledStyled placeholder="오답이 들어갈 영역입니다." />
              </U.RowStyled>
              <U.RowStyled>
                <Image source={answerC} style={{ width: 32, height: 32 }} />
                <U.QuizTextFiledStyled placeholder="오답이 들어갈 영역입니다." />
              </U.RowStyled>
            </View>
          </View>
        </TouchableHighlight>
      </S.ColumnStyled>
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
