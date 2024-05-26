export interface ISendPostcardProps {
  postcardId: number;
  memberId: number;
  memberName: string;
  memberAge: number;
  memberGender: EGender;
  memberSchoolName: string;
  memberProfileImageUrl: string;
  memberOpenKakaoRoomUrl: string;
  representativeBookTitle: string;
  representativeBookAuthor: string[];
  bookImageUrls: string[];
  postcardStatus: EPostcardStatus;
}

export enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum EPostcardStatus {
  PENDING = 'PENDING',
  ACCEPT = 'ACCEPT',
  REFUSED = 'REFUSED',
  ALL_WRONG = 'ALL_WRONG',
}

export interface IUpdatePostcardRequest {
  status: EPostcardStatus;
}
