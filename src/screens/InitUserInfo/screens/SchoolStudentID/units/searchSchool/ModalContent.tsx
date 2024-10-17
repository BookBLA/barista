import checkBlack from '@assets/images/icons/CheckBlack.png';
import { getSchools } from '@commons/api/schools/school.api';
import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { SchoolDetail } from '@commons/types/openapiGenerator';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as T from '@screens/InitBook/InitBookStack.styles';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const ModalContent = ({
  school,
  setSchool,
  toggle,
}: {
  school: string;
  setSchool: (value: string) => void;
  toggle: () => void;
}) => {
  const showToast = useToastStore((state) => state.showToast);
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState<string[]>([]); //검색해서 걸러진 데이터
  const [universityList, setUniversityList] = useState<string[]>([]);
  const { updateUserInfo } = useUserStore();

  const callSchoolList = async () => {
    try {
      const response = await getSchools();
      if (response.result && response.result.schools) {
        const schoolNames = response.result.schools.map((element: SchoolDetail) => element.name);
        setUniversityList(schoolNames.filter((name: string | undefined): name is string => name !== undefined));
      }
    } catch (error) {
      console.log('학교 리스트 가져오기 실패', error);
    }
  };

  useEffect(() => {
    callSchoolList();
  }, []);

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => {
        setSchool(item);
      }}
      style={{
        backgroundColor: school === item ? colors.buttonNavStroke : 'white',
        width: '100%',
      }}
    >
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontFamily: school === item ? 'fontBold' : 'fontMedium', fontSize: 14, margin: 10 }}>
          {item}
        </Text>
        {school === item && (
          <Image source={checkBlack} style={{ width: 12, height: 8, marginRight: 10, objectFit: 'contain' }} />
        )}
      </View>
    </TouchableOpacity>
  );
  const SearchBook = () => {
    if (search === '')
      return showToast({
        content: '검색어를 입력하세요',
      });
    updateSearch(search);
  };

  const updateSearch = (search: string) => {
    setSearch(search);
    const filtered = universityList.filter((itemList: string) => {
      return itemList.includes(search.toUpperCase());
    });
    setSearchList(filtered);
  };

  const selectSchool = (school: string) => {
    updateUserInfo({ schoolName: school });
    setSchool('');
    toggle();
  };

  return (
    <View style={{ padding: 20 }}>
      <T.SearchContainer style={{ width: '100%', paddingRight: 5 }}>
        <T.SearchBarStyled
          placeholder="원하는 학교를 검색해 보세요."
          onChangeText={(search: string) => setSearch(search)}
          onSubmitEditing={SearchBook}
        />
        <TouchableOpacity onPress={SearchBook}>
          <Image source={icons.search} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </T.SearchContainer>
      {search !== '' && searchList.length !== 0 && (
        <View style={{ maxHeight: 180, width: '100%', alignItems: 'center' }}>
          <FlatList style={{ width: '100%' }} data={searchList} renderItem={renderItem} />
        </View>
      )}

      <CustomButton
        contents="확인"
        margin="20px 0 0"
        backgroundColor={school ? colors.primary : colors.buttonAuthToggle}
        fontColor={school ? colors.textYellow : colors.primary02}
        onPress={() => {
          selectSchool(school);
        }}
      />
    </View>
  );
};

export default ModalContent;
