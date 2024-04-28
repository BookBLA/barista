import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { IProps } from './Delete.types';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomButton } from '../../../../commons/components/CustomButton/CustomButton';
import { useToggle } from '../../../../commons/hooks/useToggle';
import * as S from '../../SettingStack.styles';
import useHeaderControl from '../../../../commons/hooks/useHeaderControl';
import CheckboxOff from '../../../../../assets/images/icons/CheckboxOff.png';
import CheckboxOn from '../../../../../assets/images/icons/CheckboxOn.png';

export const Delete = ({ route }: IProps) => {
  const { config } = route.params;
  const { toggle, isOpen } = useToggle();
  useHeaderControl(config);

  return (
    <S.DeleteWrapper>
      <View>
        <CustomText size="20px" margin="31px 0 16px">
          {'북블라를 탈퇴하면\n아래의 정보가 삭제되니 주의해 주세요!'}
        </CustomText>
        <CustomText font="fontRegular" size="14px">
          1. 현재 보유 중인 엽서와 재화 (복구나 환불이 어려워요)
        </CustomText>
        <CustomText font="fontRegular" size="14px">
          2. 모든 채팅 기록과 매칭 기록, 이벤트 참여내역 데이터
        </CustomText>
        <CustomText font="fontRegular" size="14px">
          3. 회원님의 활동 이력 및 설정 내역
        </CustomText>
        <CustomText font="fontRegular" size="14px">
          4. 회원님의 개인 정보
        </CustomText>
        <CustomText size="20px" margin="50px 0 16px ">
          {'매칭을 잠시 쉬고 싶은 경우\n소개팅 일시 중지 기능을 이용해 주세요!'}
        </CustomText>
        <CustomText font="fontRegular" size="14px" color={colors.primary}>
          회원 탈퇴 후 취소가 불가능합니다 :(
        </CustomText>
      </View>
      <View>
        <S.RowWrapper>
          <TouchableOpacity onPress={toggle}>
            <S.CheckBoxImage source={isOpen ? CheckboxOn : CheckboxOff} />
          </TouchableOpacity>
          <S.TextWrapper>
            <S.RowWrapper>
              <CustomText size="14px">회원을 탈퇴하시면 </CustomText>
              <CustomText size="14px" color={colors.errorMessageRed}>
                한 달 동안 재가입하실 수 없습니다.
              </CustomText>
            </S.RowWrapper>
            <CustomText size="14px">정말 계정을 영구 삭제하시겠습니까?</CustomText>
          </S.TextWrapper>
        </S.RowWrapper>
        <CustomButton contents="게정 삭제" margin="30px 0 0" />
      </View>
    </S.DeleteWrapper>
  );
};

export default Delete;
