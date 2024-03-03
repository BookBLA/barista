export enum EPostcardStatus {
  PENDING,
  REJECT,
  APPROVE,
}

export enum EGender {
  MAN,
  WOMAN,
}

export interface ISendPostcardProps {
  index: number;
  userId: number;
  userName: string;
  userProfileImageUrl: string;
  gender: EGender;
  schoolName: string;
  age: number;
  postcardStatus: EPostcardStatus; // 대기중, 거절, 연락하기
}
