export enum EPostcardStatus {
  PENDING,
  REJECT,
  APPROVE,
  FAIL,
  READ,
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
  postcardStatus: EPostcardStatus;
  bookName: string;
  bookAuthor: string;
}
