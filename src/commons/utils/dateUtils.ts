import {
  format,
  differenceInHours,
  differenceInMinutes,
  addDays,
  differenceInDays,
  differenceInSeconds,
} from 'date-fns';

const KST_OFFSET = 9 * 60 * 60 * 1000;

const parseDate = (dateString: string) => {
  return new Date(dateString);
};

const convertToKST = (date: Date) => {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + KST_OFFSET);
};

export const formatDate = (dateString: string) => {
  const date = parseDate(dateString);
  const kstDate = convertToKST(date);
  const now = convertToKST(new Date());
  const differenceSeconds = differenceInSeconds(now, kstDate);
  const differenceMinutes = differenceInMinutes(now, kstDate);
  const differenceHours = differenceInHours(now, kstDate);

  if (differenceSeconds < 60) {
    return `${differenceSeconds}초 전`;
  }

  if (differenceMinutes < 60) {
    return `${differenceMinutes}분 전`;
  }

  if (differenceHours < 24) {
    return `${differenceHours}시간 전`;
  }

  return format(kstDate, 'yy.MM.dd');
};

export const getReLoginInfo = (dateString: string) => {
  const withdrawalDate = parseDate(dateString);
  const kstWithdrawalDate = convertToKST(withdrawalDate);
  const kstReLoginDate = addDays(kstWithdrawalDate, 30);
  const now = convertToKST(new Date());
  const daysUntilReLogin = differenceInDays(kstReLoginDate, now);

  if (daysUntilReLogin <= 0) {
    return '지금 바로 로그인할 수 있습니다.';
  }

  return `${format(kstReLoginDate, 'yyyy.MM.dd')} (약 ${daysUntilReLogin}일 후에 로그인이 가능합니다.)`;
};
