export enum EPostcardStatus {
  PENDING,
  REJECT,
  APPROVE,
  FAIL,
  READ,
}

export enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
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
