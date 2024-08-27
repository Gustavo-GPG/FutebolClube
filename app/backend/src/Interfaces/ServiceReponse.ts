export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA' | 'NOT_FOUND' | 'UNAUTHORIZED' | 'CONFLICT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: ServiceMessage;
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED' | 'UPDATED' | 'DELETED';
  data: T;
};

export type ServiceResponse<T> = ServiceResponseSuccess<T>
| ServiceResponseError;

export interface GetUserByEmailResponse {
  status: 'SUCCESSFUL' | 'NOT_FOUND';
  data?: {
    role?: string;
  };
}
