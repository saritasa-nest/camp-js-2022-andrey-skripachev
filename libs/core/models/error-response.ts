import { Immerable, OmitImmerable } from './immerable';

/** Error message: [field, message]. */
export type ErrorMessage = [string, string];

/** Validation error. */
export type ValidationError<T> = {
  [K in keyof T]?: string;
};

/** Error response. */
export class AppError<T> extends Immerable {

  /** Fields error data. */
  public readonly data: T;

  /** General error data. */
  public readonly detail: string;

  public constructor(data: InitArgs<T>) {
    super();
    this.data = data.data;
    this.detail = data.detail;
  }
}

type InitArgs<T> = OmitImmerable<AppError<T>>;
