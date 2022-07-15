type ErrorParameter = [data: string];

export interface Token {
  readonly access: string;
  readonly refresh: string;
}

interface DetailedErrorData {
  readonly password?: ErrorParameter;
  readonly email?: ErrorParameter;
}

export interface AuthError {
  readonly data: DetailedErrorData;
  readonly detail: string;
}
