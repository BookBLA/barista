export enum EStatusCode {
  /* 로그인 - 회원탈퇴
  회원이 탈퇴인 상태이므로 로그인할 수 없습니다.
  */
  LOGIN_001 = 'login_001',

  /* 로그인 - 회원탈퇴
  회원탈퇴한 뒤에 30일이 지나지 않았습니다.
  */
  LOGIN_002 = 'login_002',

  MEMBER_Email_003 = 'member_email_003',
  MEMBER_Email_011 = 'member_email_011',

  MEMBER_BOOK_004 = 'member-book_004',

  MEMBER_BOOK_005 = 'member-book_005',
}
