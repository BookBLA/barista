import * as S from './Profile.styles';
import Book from '../../../../../../../assets/images/example-book.png';
import useMovePage from '../../../../../../commons/hooks/useMovePage';
import { CustomText } from '../../../../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../../../../commons/styles/variablesStyles';
import { IDdata } from '../../../../HomeStack.types';

const Profile = ({ item }: { item: IDdata }) => {
  const { movePage } = useMovePage();

  return (
    <S.ProfileWrapper onPress={movePage('OtherLibrary', { isYourLibrary: true })}>
      <S.BookImage source={item?.bookImageUrl ?? Book} />
      <CustomText size="12px">{item?.bookName ?? '책'}</CustomText>
      <CustomText size="10px">{`${item?.memberName ?? '이름'} (${item?.memberAge ?? '00'}살)`}</CustomText>
      <CustomText size="10px" color={colors.textGray}>
        {item?.memberSchoolName ?? '대학교'}
      </CustomText>
    </S.ProfileWrapper>
  );
};

export default Profile;
