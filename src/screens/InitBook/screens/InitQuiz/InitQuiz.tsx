import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues } from '../../initBookStack.contents';
import { initBookSchema } from '../../initBookStack.schema';
import { icons } from '../../../../commons/utils/variablesImages';
import { Text, Image, View } from 'react-native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { usePostMemberBook } from './hooks/usePostMemberBook';
import { IProps } from './initQuiz.types';
import { CustomButton } from '../../../../commons/components/CustomButton/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as S from '../../../InitUserInfo/InitUserInfo.styles';
import * as U from '../../InitBookStack.styles';
import Dash from 'react-native-dash';
import useHeaderControl from '../../../../commons/hooks/useHeaderControl';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import truncateText from '../../../../commons/utils/truncateText';
import useInvalid from './hooks/useInvalid';

const InitQuiz = ({ route }: IProps) => {
  const { isRepresentative, selectedBook } = route?.params ?? '';
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
  const { callPostMemberBook } = usePostMemberBook(isRepresentative, selectedBook);
  const reviewValue = watch('review');
  const handleFormError = useInvalid();

  return (
    <>
      <U.Wrapper>
        <KeyboardAwareScrollView
          style={{ width: '100%', marginBottom: 10 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={100}
        >
          <View style={{ width: '100%', height: 'auto', alignItems: 'center' }}>
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
          <U.CenterWrapper>
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
          </U.CenterWrapper>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.ContentStyled style={{ marginTop: 10, marginBottom: 26, fontSize: 18 }}>
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
          </View>
        </KeyboardAwareScrollView>
        <S.NextButtonStyled
          style={{
            height: 50,
            bottom: 5,
            backgroundColor: isValid ? colors.primary : colors.primary02,
          }}
          onPress={handleSubmit(callPostMemberBook, handleFormError)}
        >
          <Text style={{ color: isValid ? colors.primary02 : colors.textGray, fontFamily: 'fontMedium', fontSize: 16 }}>
            등록하기
          </Text>
        </S.NextButtonStyled>

        {/* <CustomButton
          onPress={handleSubmit(callPostMemberBook, handleFormError)}
          backgroundColor={isValid ? colors.primary : colors.primary02}
          fontColor={isValid ? colors.primary02 : colors.textGray}
          contents="등록하기"
        /> */}
      </U.Wrapper>
    </>
  );
};
export default InitQuiz;
