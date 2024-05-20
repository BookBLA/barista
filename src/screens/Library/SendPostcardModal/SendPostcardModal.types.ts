export interface ISendPostcardModalProps {
  targetMemberId: number;
  memberBookIdList: number[];
  isVisible: boolean;
  onClose: () => void;
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

export interface ISendPostcardRequest {
  quizAnswerList: IQuizAnswerRequest[];
  postcardTypeId: number;
  imageUrl: string; //postcard 이미지
  memberAskId: number;
  memberReply: string;
}

export interface IQuizAnswerRequest {
  quizId: number;
  quizAnswer: string;
}

export type TCheckedQuizAnswer = {
  index: number;
  answer: string;
  quizId: number;
};

export type TMemberPersonalAsk = {
  contents: string;
  id: number;
};
