import useMovePage from '../../../../commons/hooks/useMovePage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues } from '../../initBookStack.contents';
import { initBookSchema } from '../../initBookStack.schema';
import { icons } from '../../../../commons/utils/variablesImages';
import { Text, Image, TouchableHighlight, Keyboard, View } from 'react-native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { usePostMemberQuizzes } from './hooks/usePostMemberQuizzes';
import * as S from '../../../InitUserInfo/InitUserInfo.styles';
import * as U from '../../InitBookStack.styles';
import Dash from 'react-native-dash';
import { IProps } from './initQuiz.types';

const InitQuiz = ({ route }: IProps) => {
  const { memberBookId } = route?.params ?? '';
  const { movePage } = useMovePage();
  const { control, handleSubmit, watch } = useForm({
    defaultValues,
    resolver: yupResolver(initBookSchema),
  });
  const { callPostMemberQuizzes } = usePostMemberQuizzes(memberBookId);
  const reviewValue = watch('review');

  return (
    <S.Wrapper>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', height: '9%' }}>
        <TouchableOpacity onPress={movePage()}>
          <Image source={icons.backArrow} style={{ width: 24, height: 24, marginLeft: 14 }} />
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
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <U.TextFiledStyled
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={{
                      color: colors.primary,
                    }}
                  />
                )}
                name="review"
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
                  {reviewValue.length}/100자
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
              <U.QuizStyled style={{ height: 'auto', marginBottom: 32 }}>
                <Text style={{ fontFamily: 'fontExtraLight', fontSize: 20, color: colors.primary }}>Q.</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <U.QuizTextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={{ height: 'auto' }}
                      placeholder="책을 읽었는지 확인할 질문을 적어주세요."
                      placeholderTextColor={colors.textGray2}
                    />
                  )}
                  name="quiz"
                />
              </U.QuizStyled>
              <U.RowStyled>
                <Image source={icons.answerA} style={{ width: 32, height: 32 }} />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <U.QuizTextFiledStyled
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="정답이 들어갈 영역입니다."
                    />
                  )}
                  name="quizAnswer"
                />
              </U.RowStyled>
              <U.RowStyled>
                <Image source={icons.answerB} style={{ width: 32, height: 32 }} />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <U.QuizTextFiledStyled
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="정답이 들어갈 영역입니다."
                    />
                  )}
                  name="firstWrongChoice"
                />
              </U.RowStyled>
              <U.RowStyled>
                <Image source={icons.answerC} style={{ width: 32, height: 32 }} />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <U.QuizTextFiledStyled
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="정답이 들어갈 영역입니다."
                    />
                  )}
                  name="secondWrongChoice"
                />
              </U.RowStyled>
            </View>
          </View>
        </TouchableHighlight>
      </S.ColumnStyled>
      <S.NextButtonStyled onPress={handleSubmit(callPostMemberQuizzes)}>
        <CustomText color={colors.secondary}>등록하기</CustomText>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};
export default InitQuiz;