export type TFilterKeys = 'sex' | 'smoking' | 'drinking' | 'contact' | 'dating';
type TFilterValues =
  | '성별'
  | '남성'
  | '여성'
  | '흡연 여부'
  | '비흡연'
  | '흡연'
  | '음주 여부'
  | '음주 X'
  | '월 1~2회'
  | '주 1회'
  | '주 2회 이상'
  | '매일'
  | '연락 스타일'
  | '느긋이'
  | '칼답'
  | '데이트 스타일'
  | '집 데이트'
  | '야외 데이트';

export type TFilterState = {
  [key in TFilterKeys]: TFilterValues;
};

export interface IProps {
  filter: TFilterState;
  setFilter: (filter: TFilterState) => void;
  selectedFilter: TFilterKeys;
}
