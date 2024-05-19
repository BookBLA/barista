import { TouchableOpacity } from 'react-native';
import { icons } from '../../../commons/utils/variablesImages';
import * as S from './Pagination.style';
import { IProps } from './Pagination.types';

const Pagination = ({
  size = 5,
  itemsPerPage = 10,
  pageIndex,
  startPage,
  totalPage,
  movePageIndex,
  changePageGroup,
  prevEndPage,
  nextEndPage,
}: IProps) => {
  return (
    <S.PageIndexRow>
      <S.SideWrapper>
        <TouchableOpacity onPress={prevEndPage}>
          <S.MovePageImageStyled source={icons.leftEndPage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={changePageGroup('prev')}>
          <S.MovePageImageStyled source={icons.leftPage} />
        </TouchableOpacity>
      </S.SideWrapper>
      {new Array(size).fill('').map(
        (_, index) =>
          index + startPage <= Math.ceil(totalPage / itemsPerPage) && (
            <TouchableOpacity key={index} onPress={movePageIndex(index + startPage)}>
              <S.PageIndexTextStyled selected={index + startPage === pageIndex}>
                {index + startPage}
              </S.PageIndexTextStyled>
            </TouchableOpacity>
          ),
      )}
      <S.SideWrapper>
        <TouchableOpacity onPress={changePageGroup('next')}>
          <S.MovePageImageStyled source={icons.rightPage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={nextEndPage}>
          <S.MovePageImageStyled source={icons.rightEndPage} />
        </TouchableOpacity>
      </S.SideWrapper>
    </S.PageIndexRow>
  );
};

export default Pagination;
