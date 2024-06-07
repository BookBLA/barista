export const useLimitTextLine = () => {
  const handleLimitTextLine = (text: string, setText: React.Dispatch<React.SetStateAction<string>>, limit: number) => {
    const lines = text.split('\n');
    if (lines.length <= limit) {
      setText(text);
    } else {
      setText(lines.slice(0, limit).join('\n'));
    }
  };

  return { handleLimitTextLine };
};
