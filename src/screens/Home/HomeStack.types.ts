export interface IDdata {
  bookName: string;
  memberAge: number;
  memberName: string;
  memberSchoolName: string;
  memberId?: number; // todo: 추후에 필수 값으로 바꿀 예정
}

export type TFilterKeys = 'gender' | 'smoking' | 'drinking' | 'contact' | 'dating';

export type TFilterOption = {
  label: string;
  value: string;
};

// 각 필터 키에 해당하는 옵션 배열을 맵핑하는 타입
export type TFilterOptionsType = Record<TFilterKeys, TFilterOption[]>;

// 각 필터의 현재 선택된 라벨을 저장하는 타입
export type TFilterState = Record<TFilterKeys, string>;
