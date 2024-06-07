import { TFilterKeys, TFilterOptionsType, TFilterState } from './HomeStack.types';

export const filterOptions: TFilterOptionsType = {
  gender: [
    { label: '성별', value: '' },
    { label: '남성', value: 'MALE' },
    { label: '여성', value: 'FEMALE' },
  ],
  smokeType: [
    { label: '흡연 여부', value: '' },
    { label: '비흡연', value: 'NON_SMOKE' },
    { label: '흡연', value: 'SMOKE' },
    { label: '가끔', value: 'SOMETIMES' },
  ],
  drinkType: [
    { label: '음주 여부', value: '' },
    { label: '음주 X', value: 'NONE' },
    { label: '월 1~2회', value: 'ONCE_A_MONTH' },
    { label: '주 1회', value: 'ONCE_A_WEEK' },
    { label: '주 2회 이상', value: 'OVER_TWICE_A_WEEK' },
    { label: '매일', value: 'EVERYDAY' },
  ],
  contactType: [
    { label: '연락 스타일', value: '' },
    { label: '느긋이', value: 'SLOW' },
    { label: '칼답', value: 'FAST' },
  ],
  dateStyleType: [
    { label: '데이트 스타일', value: '' },
    { label: '집 데이트', value: 'HOME' },
    { label: '야외 데이트', value: 'OUTSIDE' },
  ],
};

export const initStates: TFilterState = {
  gender: filterOptions.gender[0].label,
  smokeType: filterOptions.smokeType[0].label,
  drinkType: filterOptions.drinkType[0].label,
  contactType: filterOptions.contactType[0].label,
  dateStyleType: filterOptions.dateStyleType[0].label,
};

export const filterData: Record<TFilterKeys, string[]> = {
  gender: ['성별', '남성', '여성'],
  smokeType: ['흡연 여부', '비흡연', '흡연', '가끔'],
  drinkType: ['음주 여부', '음주 X', '월 1~2회', '주 1회', '주 2회 이상', '매일'],
  contactType: ['연락 스타일', '느긋이', '칼답'],
  dateStyleType: ['데이트 스타일', '집 데이트', '야외 데이트'],
};
