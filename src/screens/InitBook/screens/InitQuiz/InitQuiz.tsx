import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { colors } from '@commons/styles/variablesStyles';
import truncateText from '@commons/utils/ui/truncateText/truncateText';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { yupResolver } from '@hookform/resolvers/yup';
import * as U from '@screens/InitBook/InitBookStack.styles';
import { defaultValues } from '@screens/InitBook/initBookStack.contents';
import { initBookSchema } from '@screens/InitBook/initBookStack.schema';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { Controller, useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import Dash from 'react-native-dash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useInvalid from './hooks/useInvalid';
import { usePostMemberBook } from './hooks/usePostMemberBook';
import { IProps } from './initQuiz.types';

const InitQuiz = ({ route }: IProps) => {
  useScreenLogger();
  const { selectedBook } = route?.params ?? '';
  useHeaderControl({
    title: truncateText(selectedBook?.title ?? '', 22),
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(initBookSchema),
  });
  const { callPostMemberBook } = usePostMemberBook(selectedBook);
  const reviewValue = watch('review');
  const handleFormError = useInvalid();

  return (
    <>
      <U.Wrapper>
        <KeyboardAwareScrollView
          style={{ width: '100%', marginBottom: 10 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={150}
        >
          <View style={{ width: '100%', height: 'auto', alignItems: 'center' }}>
            <S.ContentStyled style={{ fontSize: 18, marginBottom: 12 }}>이 책을 좋아하는 이유</S.ContentStyled>
            <CustomText
              size="12px"
              font="fontRegular"
              color={colors.textGray2}
              margin="0 0 19px"
              style={{ textAlign: 'center' }}
            >
              이 책에서 인상 깊었던 내용과{'\n'}인상 깊었던 이유를 알려주세요!
            </CustomText>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <U.TextFiledStyled
                  placeholder="부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다."
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
          <U.CenterWrapper>
            <Dash
              style={{
                width: '85%',
                height: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 28,
                marginTop: 28,
              }}
              dashGap={5}
              dashLength={5}
              dashThickness={1.5}
              dashColor={colors.lineDivider}
            />
          </U.CenterWrapper>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.ContentStyled style={{ marginTop: 10, marginBottom: 12, fontSize: 18 }}>
              객관식 독서퀴즈 출제하기
            </S.ContentStyled>
            <CustomText size="12px" font="fontRegular" color={colors.textGray2}>
              상대방이 책을 읽었는지 확인하기 위한{' '}
            </CustomText>
            <CustomText size="12px" font="fontRegular" color={colors.textGray2} margin="0 0 30px">
              문제와 보기를 적어주세요! (정답 1개, 오답 2개)
            </CustomText>

            <U.QuizStyled>
              <Text style={{ fontFamily: 'fontExtraLight', fontSize: 20, color: colors.primary }}>Q.</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <U.QuizTextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
                    placeholder="오답이 들어갈 영역입니다."
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
                    placeholder="오답이 들어갈 영역입니다."
                  />
                )}
                name="secondWrongChoice"
              />
            </U.RowStyled>
            <CustomText font="fontRegular" size="10px" color={colors.textGray2}>
              *부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다.
            </CustomText>
          </View>
        </KeyboardAwareScrollView>
        <S.NextButtonStyled
          style={{
            height: 44,
            bottom: 5,
            backgroundColor: isValid ? colors.primary : colors.primary02,
          }}
          onPress={handleSubmit(callPostMemberBook, handleFormError)}
        >
          <Text style={{ color: isValid ? colors.primary02 : colors.textGray, fontFamily: 'fontMedium', fontSize: 14 }}>
            등록하기
          </Text>
        </S.NextButtonStyled>
      </U.Wrapper>
    </>
  );
};
export default InitQuiz;
