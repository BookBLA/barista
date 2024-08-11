import { Post } from '../../../configs/axios/http.api';

export interface IContents {
  reportedMemberId: number;
  reportStatuses: {
    bookQuizReport: boolean;
    reviewReport: boolean;
    askReport: boolean;
    replyReport: boolean;
    profileImageReport: boolean;
  };
  etcContents: string;
}

export const postMemberReports = (contents: IContents) => Post('member-reports', contents);
