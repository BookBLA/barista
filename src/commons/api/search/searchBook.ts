import { Get } from '@commons/configs/axios/http.api';
import { BookSearchResponses } from '@commons/types/openapiGenerator';

export const getSearchBookApi = (text: string, page: number) => {
  //   console.log('text', text);
  return Get<BookSearchResponses>(`books?text=${text} &page=${page}`);
};
