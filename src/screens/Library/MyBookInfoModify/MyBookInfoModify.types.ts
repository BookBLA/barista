export interface IMyBookInfoModifyProps {
  memberId: number;
  memberBookId: number;
  deleteBookFunc: () => void;
}

export type TBookInfo = {
  memberBookId?: number;
  title?: string;
  imageUrl?: string;
  authors?: string[];
  representative?: boolean;
  review?: string;
  quizId?: number;
  quiz?: string;
  firstChoice?: string;
  secondChoice?: string;
  thirdChoice?: string;
};

export type TBookQuizInfo = {
  memberBookId?: number;
  id: number;
  quiz: string;
  firstChoice: string;
  secondChoice: string;
  thirdChoice: string;
  review: string;
};

export type TMemberStyleInfo = {
  memberId?: number;
  smokeType?: string;
  contactType?: string;
  dateCostType?: string;
  dateStyleType?: string;
  justFriendType?: string;
  drinkType?: string;
  mbti?: string;
  memberAsk?: string;
  memberAskId?: number;
};

export type TInvitationCode = {
  invitationCode: string;
};
