import MbtiItem from '@commons/components/Lists/MbtiItem/MbtiItem';
import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';

const MbtiComponent = ({ mbti, setMbti }: { mbti: string[]; setMbti: Dispatch<SetStateAction<string[]>> }) => {
  const mbtiNames: string[][] = [
    ['E\n외향형', 'I\n내향형'],
    ['S\n감각형', 'N\n직관형'],
    ['T\n사고형', 'F\n감정형'],
    ['J\n판단형', 'P\n인식형'],
  ];
  // console.log('mbti', mbti);

  return (
    <View>
      {mbtiNames.map((name: string[], index: number) => (
        <MbtiItem char={mbti[index]} key={name[0]} name={name} setMbti={setMbti} index={index} />
      ))}
    </View>
  );
};

export default MbtiComponent;
