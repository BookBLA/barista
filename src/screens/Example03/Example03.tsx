import { Button, SafeAreaView, Text, View } from 'react-native';
import * as S from './Example03.styles';
import { CustomModal } from '../../commons/components/CustomModal/CustomModal';
import { useToggle } from '../../commons/hooks/useToggle';

const Example03 = () => {
  const { isOpen, toggle } = useToggle();

  const modalConfig = {
    visible: isOpen, // 모달 온오프 상태관리 변수입니다. // 필수값
    onClose: toggle, // 모달 온오프 관리하는 함수입니다. // 필수값
    close: true, // 우측 상단 x 버튼 표시 유무 입니다. // 선택값
    mode: 'round', // 모달 하단에 버튼 표시 유무 arrow 모드, round모드가 있습니다. // 선택값
    buttons: [
      { label: '취소', action: toggle, color: '#fff', bgColor: 'red' },
      { label: '확인', action: toggle, color: '#fff' },
    ],
    // 모달 하단에 버탠의 갯수 최대 2개  // mode 속성 등록 시에만 필수값 입니다.
    // label: 선택, action: 필수, color: 선택, bgColor: 선택
  };

  const modalConfig2 = {
    visible: isOpen,
    onClose: toggle,
    mode: 'arrow',
    buttons: [{ action: toggle }, { action: toggle }],
  };

  // 타입 참고
  //  interface IModalConfig {
  //   onClose: () => void;
  //   buttons?: {
  // action: () => void;
  // bgColor?: string;
  // color?: string;
  // label?: string;
  // }
  //   close: boolean;
  //   mode?: string;
  //   size?: string | number;
  //   visible: boolean;
  // }
  return (
    <SafeAreaView>
      <View style={{ marginTop: 100 }}>
        <Button title="모달 열기" onPress={toggle} />

        <CustomModal modalConfig={modalConfig}>
          <S.Wrapper>
            <Text>공용 모달 컴포넌트입니다.</Text>
          </S.Wrapper>
        </CustomModal>
      </View>
    </SafeAreaView>
  );
};

export default Example03;
