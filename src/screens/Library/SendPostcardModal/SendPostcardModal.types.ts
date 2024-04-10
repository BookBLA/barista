export interface ISendPostcardModalProps {
  personalQuiz: string;
  postcardInfos: postcardInfo[];
  bookInfos: IBookInfo[];
}

export interface postcardInfo {
  id: number;
  imageUrl: string;
}

export interface IBookInfo {
  bookImageUrl: string;
  bookName: string;
  bookAuthors: string[];
  bookQuiz: IBookQuiz;
}

export interface IBookQuiz {
  id: number;
  title: string;
  answerId: number;
  questions: IBookQuestion[];
}

export interface IBookQuestion {
  id: number;
  text: string;
}

export interface checkedQuizAnswer {
  quizId: number;
  checkedAnswerId: number;
}
