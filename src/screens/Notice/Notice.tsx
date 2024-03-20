import { Image, TouchableOpacity } from 'react-native';
import { CustomText } from '../../commons/components/TextComponents/CustomText/CustomText';
import * as S from './Notice.styles';
import { colors } from '../../commons/styles/variablesStyles';
import Close from '../../../assets/images/icons/close.png';
import useHeaderControl from '../../commons/hooks/useHeaderControl';

export const Notice = () => {
  useHeaderControl({
    title: '설정',
    // left: false, // 뒤로가기 버튼: 초기값 true 필요 없을 시에만 false 입력
    // right: {
    //   image: Close, // 이미지 등록
    //   onPress: () => alert('작동'), // 함수 등록
    // }, // 필요한 경우에만 입력
  });

  return (
    <S.Wrapper>
      <TouchableOpacity>
        <CustomText margin="0 0 10px">전체 삭제</CustomText>
      </TouchableOpacity>
      <S.ScrollWrapper>
        {new Array(10).fill('').map(() => (
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
                <Image source={Close}></Image>
              </TouchableOpacity>
            </S.BottomWrapper>
          </S.NoticeWrapper>
        ))}
      </S.ScrollWrapper>
    </S.Wrapper>
  );
};
