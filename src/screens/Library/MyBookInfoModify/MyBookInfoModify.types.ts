export interface IMyBookInfoModifyProps {
  memberId: number;
  memberBookId: number;
  bookImageUrl: string | undefined;
}

export type TBookInfo = {
  memberBookId: number;
  title: string;
  thumbnail: string;
  authors: string[];
  representative: boolean;
};

export type TBookQuizInfo = {
  id: number;
  quiz: string;
  firstChoice: string;
  secondChoice: string;
  thirdChoice: string;
};
