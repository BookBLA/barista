import { FlatList, TouchableOpacity, View, Text, Image } from 'react-native';
import * as S from '../../../InitUserInfo.styles';
import * as T from '../../../../InitBook/InitBookStack.styles';
import { useUserStore } from '../../../../../commons/store/useUserinfo';
import { useEffect, useState } from 'react';
import { universityList } from '../../../../../commons/contents/universityList/universityList';
import { colors } from '../../../../../commons/styles/variablesStyles';
import useToastStore from '../../../../../commons/store/useToastStore';
import { icons } from '../../../../../commons/utils/variablesImages';
import checkBlack from '../../../../../../assets/images/icons/CheckBlack.png';
import { ModalWrapper } from '../../../../Setting/SettingStack.styles';
import { getSchools } from '../../../../../commons/api/schools/school.api';

const ModalContent = ({ school, setSchool }: { school: string; setSchool: (value: string) => void }) => {
  const showToast = useToastStore((state) => state.showToast);
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]); //검색해서 걸러진 데이터
  const [universityList, setUniversityList] = useState([]);

  const callSchoolList = async () => {
    try {
      const response = await getSchools();
      const schoolNames = response.result.schools.map(
        (element: { id: 0; name: string; emailDomain: string; schoolStatus: string }) => element.name,
      );
      setUniversityList(schoolNames);
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
        {school === item && <Image source={checkBlack} style={{ width: 12, height: 8, marginRight: 10 }} />}
      </View>
    </TouchableOpacity>
  );
  const SearchBook = () => {
    if (search === '')
      return showToast({
        content: '검색어를 입력하세요',
      });
    updateSearch(search);
    // if (pageIndex !== 1) prevEndPage();
    // callGetSearchBookApi(search, pageIndex, true);
  };

  const updateSearch = (search: string) => {
    setSearch(search);
    const filtered = universityList.filter((itemList: string[]) => {
      return itemList.includes(search.toUpperCase());
    });
    setSearchList(filtered);
  };
  return (
    <ModalWrapper>
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
    </ModalWrapper>
  );
};

export default ModalContent;
