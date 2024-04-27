export interface IMyBookInfoModifyProps {
  memberId: number;
  memberBookId: number;
  deleteBookFunc: () => void;
}

export type TBookInfo = {
  memberBookId: number;
  title: string;
  imageUrl: string;
  authors: string[];
  representative: boolean;
};

export type TBookQuizInfo = {
  id: number;
  quiz: string;
  firstChoice: string;
  secondChoice: string;
  thirdChoice: string;
  review: string;
};
