import { Get } from '../../utils/http.api';

export const getSearchBookApi = (text: string, page: number) => {
  //   console.log('text', text);
  return Get(`books?text=${text} &page=${page}`);
};
