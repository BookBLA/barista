import { AxiosError } from 'axios';

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).response !== undefined;
};

export const isAxiosErrorResponse = (
  error: unknown,
): error is AxiosError & { response: { data: { message: string; code: string } } } => {
  return isAxiosError(error) && error.response?.data !== undefined;
};
