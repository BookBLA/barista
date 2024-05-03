import { colors } from '../../../commons/styles/variablesStyles';
import { Text, View, Keyboard } from 'react-native';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle.styles';
import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { useState } from 'react';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { deviceHeight } from '../../../commons/utils/dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableHighlight } from '@gorhom/bottom-sheet';
import { useStyleStore } from '../../../commons/store/useStyle';
import { postMemberStyleApi } from '../../../commons/api/memberStyle.api';
import useMemberStore from '../../../commons/store/useMemberStore';

const PersonalQuestion = () => {
  const [question, setQuestion] = useState('');
  const { updateStyleInfo, styleInfo, resetStyleInfo } = useStyleStore();
  const memberId = useMemberStore((state) => state.memberInfo.id);

  const callPostStyleApi = async () => {
    try {
      console.log('styleInfo', styleInfo);
      const response = await postMemberStyleApi(
        {
          mbti: styleInfo.mbti,
          smokeType: styleInfo.smokeType,
          drinkType: styleInfo.drinkType,
          contactType: styleInfo.contactType,
          dateStyleType: styleInfo.dateStyleType,
          dateCostType: styleInfo.dateCostType,
          justFriendType: styleInfo.justFriendType,
          memberAsk: question,
        },
        memberId,
      );
      updateStyleInfo('memberAsk', question);
      console.log('postMemberStyleApi', response);
      movePage('initBookStack')();
    } catch (error) {
      console.log('ERROR) postMemberStyleApi', error);
    }
  };

  const { movePage } = useMovePage();
  const nextPage = async () => {
    await callPostStyleApi();
    resetStyleInfo();

    console.log('styleInfo', styleInfo);
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={100} />
      <TouchableHighlight
        style={{
          height: deviceHeight * 0.7,
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
        onPress={Keyboard.dismiss}
        underlayColor="transparent"
      >
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled style={{ marginBottom: 10 }}>상대방에게 궁금한 점을 적어주세요</S.ContentStyled>
          <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14, marginBottom: 10 }}>
            ex) 주로 어디서 책을 읽나요?
          </Text>
          <T.TextFiledStyled
            defaultValue={styleInfo.memberAsk}
            onChangeText={(text: string) => setQuestion(text)}
            //onFocus={handleFocus}
            // onBlur={() => updateStyleInfo('memberAsk', question)}
            style={{
              color: colors.primary,
            }}
          />
          <S.RowStyled style={{ justifyContent: 'flex-end', width: '80%' }}>
            <Text
              style={{
                color: colors.textGray2,
                fontFamily: 'fontRegular',
                fontSize: 12,
                marginTop: 5,
              }}
            >
              {question.length}/80자
            </Text>
          </S.RowStyled>
        </View>
      </TouchableHighlight>
      {question === '' ? (
        <S.NextButtonStyled style={{ backgroundColor: '#BBBFCF' }}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
        </S.NextButtonStyled>
      ) : (
        <S.NextButtonStyled onPress={nextPage}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
        </S.NextButtonStyled>
      )}
    </S.Wrapper>
  );
};
export default PersonalQuestion;
