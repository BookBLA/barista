import { Text, View } from 'react-native';

import ModifyMbtiItem from './ModifyMbtiItem';
import { deviceHeight, deviceWidth } from '../../utils/dimensions';
import { Dispatch, SetStateAction } from 'react';

const ModifyMBTI = ({ setMbti }: { setMbti: Dispatch<SetStateAction<string[]>> }) => {
  const mbtiNames: string[][] = [
    // ['E\n외향형', 'S\n감각형', 'T\n사고형', 'J\n판단형'],
    // ['I\n내향형', 'N\n직관형', 'F\n감정형', 'P\n인식형'],
    ['E\n외향형', 'I\n내향형'],
    ['S\n감각형', 'N\n직관형'],
    ['T\n사고형', 'F\n감정형'],
    ['J\n판단형', 'P\n인식형'],
  ];

  return (
    <View style={{ width: '93%', height: 154, justifyContent: 'space-between', flexDirection: 'row' }}>
      {mbtiNames.map((name: string[], index: number) => (
        <ModifyMbtiItem key={index} name={name} setMbti={setMbti} index={index} />
      ))}
    </View>
  );
};

export default ModifyMBTI;
