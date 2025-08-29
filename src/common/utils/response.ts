/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export interface Response<T = any> {
  status: string;
  message: string;
  data?: T;
}
export const successResponse = (message: string, data: any): Response => {
  return {
    status: 'success',
    message: message,
    data: data,
  };
};

export const errorResponse = (error: any): Response => {
  const err = error as Error;
  return {
    status: 'error',
    message: err.message,
  };
};
