export enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface IMemberData {
  bookAuthors?: string[];
  bookCoverImageUrl?: string;
  bookTitle?: string;
  memberAge?: number;
  memberBookId?: number;
  memberGender?: string;
  memberId?: number;
  memberName?: string;
  memberProfileImageUrl?: string;
  memberSchoolName?: string;
  review?: string;
}
