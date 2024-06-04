import { View } from 'react-native';
import React from 'react';
import * as S from './ViewStyle.styles';
import { PersonalQuizAnswerBox, UserStyleBox } from './ViewStyle.styles';
import { IViewStyleProps } from './ViewStyle.types';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../commons/styles/variablesStyles';

const ViewStyle: React.FC<IViewStyleProps> = ({ styles, friendPreferenceType, personalQuestion }) => {
  return (
    <>
      <View style={{ backgroundColor: 'white' }}>
        <S.HeaderView>
          <CustomText font="fontMedium" size="14px" color={colors.textYellow}>
            스타일
          </CustomText>
        </S.HeaderView>
        <S.BodyView>
          <S.UserStyleView>
            <CustomText size="16px" font="fontMedium">
              스타일
            </CustomText>
            <S.UserStyleBoxContainer>
              {styles.map((style) => (
                <UserStyleBox>
                  <CustomText size="12px" font="fontLight">
                    {style}
                  </CustomText>
                </UserStyleBox>
              ))}
            </S.UserStyleBoxContainer>
          </S.UserStyleView>

          <S.UserStyleView>
            <CustomText size="16px" font="fontMedium">
              남사친 / 여사친
            </CustomText>
            <S.UserStyleBoxContainer>
              <UserStyleBox>
                <CustomText size="12px" font="fontLight">
                  {friendPreferenceType}
                </CustomText>
              </UserStyleBox>
            </S.UserStyleBoxContainer>
          </S.UserStyleView>

          <S.UserStyleView>
            <CustomText size="16px" font="fontMedium">
              개인 질문
            </CustomText>
            <S.UserStyleBoxContainer>
              <PersonalQuizAnswerBox>
                <CustomText size="14px" font="fontLight">
                  {personalQuestion}
                </CustomText>
              </PersonalQuizAnswerBox>
            </S.UserStyleBoxContainer>
          </S.UserStyleView>
        </S.BodyView>
      </View>
    </>
  );
};

export default ViewStyle;
