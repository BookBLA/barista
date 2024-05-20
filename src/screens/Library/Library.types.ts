export type TLibrary = {
  memberId: number;
  name: string;
  age: number;
  gender: string;
  school: string;
  profileImageUrl: string;
  bookResponses: [TBookResponses];
};

export type TYourLibrary = {
  baseResponse: {
    memberId: number;
    name: string;
    age: number;
    gender: string;
    school: string;
    profileImageUrl: string;
    bookResponses: [TBookResponses];
  };
};

export type TBookResponses = {
  memberBookId: number;
  bookImageUrl: string;
  representative: boolean;
};

export type TUpdateBookInfo = {
  memberBookId: number;
  quiz: string;
  quizAnswer: string;
  firstWrongChoice: string;
  secondWrongChoice: string;
};

export type TUpdateBookReview = {
  memberBookId: number;
  contents: string;
};
