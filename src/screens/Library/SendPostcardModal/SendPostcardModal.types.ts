export interface ISendPostcardModalProps {
  targetMemberId: number;
  memberBookIdList: number[];
  isVisible: boolean;
}

export interface TPostcardInfo {
  postcardTypeId: number;
  postcardTypeName: string;
  postcardTypePrice: number;
  postcardImageUrl: string;
}

export interface checkedQuizAnswer {
  quizIndex: number;
  checkedAnswerIndex: number;
}
