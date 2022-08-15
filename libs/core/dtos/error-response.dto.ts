/** Error response. */
export interface ErrorResponseDto<T> {

  /** Detailed errors for fields.  */
  readonly data: T;

  /** General error message. */
  readonly detail: string;
}
