export interface ISendPostcardModalProps {
  targetMemberId: number;
  postcardInfos: postcardInfo[];
  memberBookIdList: number[];
  isVisible: boolean;
}

export interface postcardInfo {
  id: number;
  imageUrl: string;
}

export interface checkedQuizAnswer {
  quizIndex: number;
  checkedAnswerIndex: number;
}
