export interface ISendPostcardModalProps {
  props: IBookInfo[];
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
