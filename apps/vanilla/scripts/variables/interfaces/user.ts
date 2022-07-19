type ErrorParameter = [data: string];

/** JWT token. */
export interface Token {

  /** Access token. */
  readonly access: string;

  /** Refresh token. */
  readonly refresh: string;
}

interface DetailedErrorData {

  /** Error for password. */
  readonly password?: ErrorParameter;

  /** Error for email. */
  readonly email?: ErrorParameter;
}

/** User authentication error. */
export interface AuthError {

  /** Detailed information about the error. */
  readonly data: DetailedErrorData;

  /** Error message. */
  readonly detail: string;
}

export interface Authorization {

  readonly email: string;

  readonly password: string;
}
