import { TFilterOptionsType, TFilterState } from './HomeStack.types';

// todo: 상수 파일 정리 예정
export const filterOptions: TFilterOptionsType = {
  gender: [
    { label: '성별', value: '' },
    { label: '남성', value: 'MALE' },
    { label: '여성', value: 'FEMALE' },
  ],
  smoking: [
    { label: '흡연 여부', value: '' },
    { label: '비흡연', value: 'NON_SMOKE' },
    { label: '흡연', value: 'SMOKE' },
  ],
  drinking: [
    { label: '음주 여부', value: '' },
    { label: '음주 X', value: 'NONE' },
    { label: '월 1~2회', value: 'ONCE_A_MONTH' },
    { label: '주 1회', value: 'ONCE_A_WEEK' },
    { label: '주 2회 이상', value: 'OVER_ONCE_A_WEEK' },
    { label: '매일', value: 'EVERYDAY' },
  ],
  contact: [
    { label: '연락 스타일', value: '' },
    { label: '느긋이', value: 'SLOW' },
    { label: '칼답', value: 'FAST' },
  ],
  dating: [
    { label: '데이트 스타일', value: '' },
    { label: '집 데이트', value: 'HOME' },
    { label: '야외 데이트', value: 'OUTSIDE' },
  ],
};

export const initStates: TFilterState = {
  gender: filterOptions.gender[0].label,
  smoking: filterOptions.smoking[0].label,
  drinking: filterOptions.drinking[0].label,
  contact: filterOptions.contact[0].label,
  dating: filterOptions.dating[0].label,
};
