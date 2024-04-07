import { Get } from '../utils/http.api';

export const getSearchBookApi = (text: string) => {
  console.log('text', text);
  return Get(`books?text=${text}`);
};
