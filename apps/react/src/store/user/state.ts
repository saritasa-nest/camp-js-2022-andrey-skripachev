import { AppError } from '@js-camp/core/models/error-response';
import { User } from '@js-camp/core/models/user';
import { UserValidationErrors } from '@js-camp/core/models/user-validation-errors';

/** User state. */
export interface UserState {

  /** Current user. */
  readonly user: User | null;

  /** Error. */
  readonly error?: string;

  /** Authorization errors. */
  readonly authError?: AppError<UserValidationErrors>;

  /** Whether the user is loading or not. */
  readonly isLoading: boolean;

}

export const initialState: UserState = {
  isLoading: false,
  user: null,
};
