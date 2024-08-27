export const isHangul = (text: string) => {
  const hangulRegex = /^[\u3131-\u318E\uAC00-\uD7A3\u00B7\u11A2]+$/;
  return hangulRegex.test(text);
};
