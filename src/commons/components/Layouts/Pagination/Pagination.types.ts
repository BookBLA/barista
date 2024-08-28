export interface IProps {
  size?: number;
  itemsPerPage?: number;
  pageIndex: number;
  startPage: number;
  totalPage: number;
  movePageIndex: (pageIndex: number) => () => void;
  changePageGroup: (direction: string) => () => void;
  prevEndPage: () => void;
  nextEndPage: () => void;
}
