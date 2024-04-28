export type TLibrary = {
  memberId: number;
  name: string;
  age: number;
  gender: string;
  school: string;
  profileImageUrl: string;
  bookResponses: [TBookResponses];
};

export type TBookResponses = {
  memberBookId: number;
  bookImageUrl: string;
  representative: boolean;
};
