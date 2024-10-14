import { EPostcardStatus } from '../Send/SendPostcard.types';

export interface IReceivePostcardProps {
  postcardId: number;
  memberId: number;
  memberName: string;
  memberAge: number;
  memberGender: string;
  memberProfileImageUrl: string;
  drinkType: string;
  smokeType: string;
  contactType: string;
  dateStyleType: string;
  dateCostType: string;
  mbti: string;
  justFriendType: string;
  memberSchoolName: string;
  quizScore: number;
  bookTitles: string[];
  bookImageUrls: string[];
  correctStatuses: string[];
  memberReplyContent: string;
  memberOpenKakaoRoomUrl: string;
  postcardImageUrl: string;
  postcardStatus: EPostcardStatus;
}

export interface IReadPostcardProps {
  sendMemberId: number;
  sendMemberName: string;
  receiveMemberId: number;
  receiveMemberBookId: number;
  memberReply: string;
}
