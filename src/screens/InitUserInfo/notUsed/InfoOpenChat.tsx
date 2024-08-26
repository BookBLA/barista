import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import { colors } from '@commons/styles/variablesStyles';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Text } from 'react-native';
import * as S from '../InitUserInfo.styles';
import Carousel from './Carousel';

const screenWidth = Math.round(Dimensions.get('window').width);
const PAGES = [
  {
    content: '1. 카카오톡 하단 메뉴 오픈 채팅방 클릭',
    img: img.openChat1,
    index: 1,
  },
  {
    content: '2. 오픈채팅방 생성하기 클릭',
    img: img.openChat2,
    index: 2,
  },
  {
    content: '3. 1:1 채팅방 만들기',
    img: img.openChat3,
    index: 3,
  },
  {
    content: '4. 북블라 채팅방 이름 정하기',
    img: img.openChat4,
    index: 4,
  },
  {
    content: '5. (필수) 기본프로필만 참가 허용하기',
    img: img.openChat5,
    index: 5,
  },
  {
    content: '6. 검색허용 반드시 끄기',
    img: img.openChat6,
    index: 6,
  },
  {
    content: '7. 링크 복사 후 위 입력칸에 붙여넣기',
    img: img.openChat7,
    index: 7,
  },
  {
    content: '8. 이성에게 연락 받을 북블라 채팅방 완성',
    img: img.openChat8,
    index: 8,
  },
];

const InfoOpenChat = () => {
  useManageMargin();
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <LinearGradient style={{ flex: 1 }} colors={['#F7F4ED', 'white']}>
        <Carousel gap={10} offset={10} pages={PAGES} pageWidth={screenWidth - (10 + 10) * 2} />
      </LinearGradient>
      <S.NextButtonStyled onPress={movePage()} style={{ marginBottom: 10 }}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>시작하기</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};
export default InfoOpenChat;
