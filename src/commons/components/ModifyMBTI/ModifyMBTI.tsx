import { Text, View } from 'react-native';

import ModifyMbtiItem from './ModifyMbtiItem';
import { deviceHeight, deviceWidth } from '../../utils/ui/dimensions/dimensions';
import { Dispatch, SetStateAction, useState } from 'react';

const ModifyMBTI = ({ setMbti, mbti }: { setMbti: Dispatch<SetStateAction<string[]>>; mbti: string[] }) => {
  const mbtiNames: string[][] = [
    ['E\n외향형', 'I\n내향형'],
    ['S\n감각형', 'N\n직관형'],
    ['T\n사고형', 'F\n감정형'],
    ['J\n판단형', 'P\n인식형'],
  ];
  // const [isSelect, setSelect] = useState(false);

  // setSelect(name[0][0] === mbti[index]);

  return (
    <View style={{ width: '93%', height: 154, justifyContent: 'space-between', flexDirection: 'row' }}>
      {mbtiNames.map((name: string[], index: number) => {
        // console.log('qq11', mbtiNames[index][0][0]);
        // console.log('mbti', mbti[index]);
        // console.log('name[0] === mbti[index]', name[0] === mbti[index]);

        return (
          <ModifyMbtiItem
            key={index}
            name={name}
            setMbti={setMbti}
            index={index}
            mbti={mbti[index]}
            isSelect={name[0][0] === mbti[index]}
            // setSelect={setSelect}
          />
        );
      })}
    </View>
  );
};

export default ModifyMBTI;
