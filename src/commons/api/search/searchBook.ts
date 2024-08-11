import { Get } from '../../configs/axios/http.api';

export const getSearchBookApi = (text: string, page: number) => {
  //   console.log('text', text);
  return Get(`books?text=${text} &page=${page}`);
};
