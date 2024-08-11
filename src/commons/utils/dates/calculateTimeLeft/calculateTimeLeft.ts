// todo: 반환 형식과 엔드타임을 정해서 사용자가 원하는 값 나오게 변경 예정
export const calculateTimeLeft = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + (now.getHours() >= 6 ? 1 : 0));
  tomorrow.setHours(6, 0, 0, 0);

  const diff = Number(tomorrow) - Number(now);

  const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');

  return `${hours}:${minutes}`;
};
