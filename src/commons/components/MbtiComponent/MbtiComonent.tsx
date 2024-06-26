import { View } from 'react-native';

//import * as S from './MbtiComponent.styles';
import MbtiItem from '../MbtiItem/MbtiItem';
import { deviceHeight } from '../../utils/dimensions';
import { Dispatch, SetStateAction } from 'react';

const MbtiComponent = ({ mbti, setMbti }: { mbti: string[]; setMbti: Dispatch<SetStateAction<string[]>> }) => {
  const mbtiNames: string[][] = [
    ['E\n외향형', 'I\n내향형'],
    ['S\n감각형', 'N\n직관형'],
    ['T\n사고형', 'F\n감정형'],
    ['J\n판단형', 'P\n인식형'],
  ];
  // console.log('mbti', mbti);

  return (
    <View style={{ height: deviceHeight * 0.52, justifyContent: 'space-between' }}>
      {mbtiNames.map((name: string[], index: number) => (
        <MbtiItem char={mbti[index]} key={index} name={name} setMbti={setMbti} index={index} />
      ))}
    </View>
  );
};

export default MbtiComponent;
