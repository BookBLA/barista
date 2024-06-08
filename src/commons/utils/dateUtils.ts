import { format, parseISO, differenceInHours, addDays, differenceInDays } from 'date-fns';

const parseDate = (dateString: string) => {
  const dateWithoutNano = dateString.substring(0, 23) + 'Z';
  return parseISO(dateWithoutNano);
};

export const formatDate = (dateString: string) => {
  const date = parseDate(dateString);
  const now = new Date();
  const differenceHours = differenceInHours(now, date);

  if (differenceHours < 24) {
    return `${differenceHours}시간 전`;
  }

  return format(date, 'yy.MM.dd');
};

export const getReLoginInfo = (dateString: string) => {
  const withdrawalDate = parseDate(dateString);
  const reLoginDate = addDays(withdrawalDate, 30);
  const now = new Date();
  const daysUntilReLogin = differenceInDays(reLoginDate, now);

  if (daysUntilReLogin <= 0) {
    return '지금 바로 로그인할 수 있습니다.';
  }

  return `${format(reLoginDate, 'yyyy.MM.dd')} (약 ${daysUntilReLogin}일 후에 로그인이 가능합니다.)`;
};
