import { Image, TouchableOpacity } from 'react-native';
import { CustomText } from '../../commons/components/CustomText/CustomText';
import * as S from './Notice.styles';
import { colors } from '../../commons/styles/variablesStyles';

export const Notice = () => {
  return (
    <S.Wrapper>
      <TouchableOpacity>
        <CustomText margin="0 0 10px">전체 삭제</CustomText>
      </TouchableOpacity>
      <S.ScrollWrapper>
        {new Array(10).fill('').map((el) => (
          <S.NoticeWrapper>
            <CustomText>알림 제목이 들어갈 자리입니다.</CustomText>
            <CustomText margin="6px 0 20px" size="12px" font="fontRegular" color={colors.textGray4}>
              한줄로 알람이 들어갈 경우
            </CustomText>
            <S.BottomWrapper>
              <CustomText size="12px" color={colors.textGray2} font="fontSemiBold">
                YY.MM.DD
              </CustomText>
              <TouchableOpacity>
                <Image source={require('../../../assets/images/icons/close.png')}></Image>
              </TouchableOpacity>
            </S.BottomWrapper>
          </S.NoticeWrapper>
        ))}
      </S.ScrollWrapper>
    </S.Wrapper>
  );
};
