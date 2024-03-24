import { SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import useManageMargin from '../../commons/hooks/useManageMargin';
import * as S from './MyLibrary.styles';
import settingIcon from '../../../assets/images/icons/Setting.png';
import postcardImage from '../../../assets/images/example-postcard.png';
import { EGender } from '../Matching/Postcard/Send/SendPostcard.types';
import manIcon from '../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../assets/images/icons/WomanSmall.png';

const Matching = () => {
  useManageMargin();

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <S.HeaderView>
        <S.HeaderTextWrapper>
          <S.HeaderText>마이페이지</S.HeaderText>
        </S.HeaderTextWrapper>
        <TouchableOpacity onPress={() => console.log('여기에 설정 추가')}>
          <S.HeaderImage source={settingIcon} />
        </TouchableOpacity>
      </S.HeaderView>

      <S.UserInfoContainerView>
        <S.UserInfoView>
          <S.CircularImage source={postcardImage} resizeMode="contain" />
          <S.ProfileImageModificationImage source={require('../../../assets/images/icons/ProfileImageSetting.png')} />
          <S.UserInfoWrapper>
            <S.UserInfoNameWrapper>
              <S.UserNameText>방근호 | 21</S.UserNameText>
              <S.GenderIconStyled source={EGender.MAN ? manIcon : womanIcon} />
            </S.UserInfoNameWrapper>
            <S.SchoolNameText>가천대</S.SchoolNameText>
          </S.UserInfoWrapper>
        </S.UserInfoView>

        <S.ProfileModifyButtonContainer>
          <S.ProfileModifyButtonText>프로필 수정</S.ProfileModifyButtonText>
        </S.ProfileModifyButtonContainer>
      </S.UserInfoContainerView>

      <S.BookListContainerView>
        <S.BookContainer>
          <S.ModalBookListContainer>
            <S.BookTouchableOpacity>
              <S.BookImage source={require('../../../assets/images/example-book.png')} />
              <S.BookMarkIconImage source={require('../../../assets/images/icons/Bookmark.png')} />
            </S.BookTouchableOpacity>
            <S.BookTouchableOpacity>
              <S.BookImage source={require('../../../assets/images/example-book.png')} />
            </S.BookTouchableOpacity>
          </S.ModalBookListContainer>
          <S.BookShelves style={S.styles.Shadow} />
        </S.BookContainer>
        <S.BookContainer>
          <S.ModalBookListContainer>
            <S.BookTouchableOpacity>
              <S.BookImage source={require('../../../assets/images/example-book.png')} />
            </S.BookTouchableOpacity>
            <S.BookTouchableOpacity>
              <S.EmptyBookImage>
                <S.EmptyBookPlusImage source={require('../../../assets/images/icons/PlusBook.png')} />
              </S.EmptyBookImage>
            </S.BookTouchableOpacity>
          </S.ModalBookListContainer>
          <S.BookShelves style={S.styles.Shadow} />
        </S.BookContainer>
      </S.BookListContainerView>
    </SafeAreaView>
  );
};

export default Matching;
