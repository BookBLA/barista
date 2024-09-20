export interface ResponseData<T> {
  code: string;
  isSuccess: boolean;
  result: T;
}
