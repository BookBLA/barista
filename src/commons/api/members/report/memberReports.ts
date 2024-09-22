import { Post } from '@commons/configs/axios/http.api';
import { MemberReportCreateRequest } from '@commons/types/openapiGenerator';

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

export const postMemberReports = (contents: MemberReportCreateRequest) => Post('member-reports', contents);
