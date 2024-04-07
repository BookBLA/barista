import { useState } from 'react';
import { icons } from '../../utils/variablesImages';
import * as S from './SearchedBookList.styles';
import { Image, View } from 'react-native';

export const SearchedBookList = ({ item }) => {
  const [selected, setSelected] = useState(false);
  const Selected = () => {
    setSelected(!selected);
  };

  return (
    <S.BookListStyled>
      <S.BookImageStyled onPress={Selected}>
        {selected === true && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
            }}
          >
            <Image style={{ height: 40, width: 40 }} source={icons.selected} />
          </View>
        )}
        <Image style={{ height: 100, width: 72, borderRadius: 6 }} source={{ uri: item.imageUrl }} />
      </S.BookImageStyled>
      <S.ColumnStyled>
        <S.BookTitleStyled>{item.title}</S.BookTitleStyled>
        <S.BookAuthorStyled>{item.authors}</S.BookAuthorStyled>
      </S.ColumnStyled>
    </S.BookListStyled>
  );
};
