import { User } from '@js-camp/core/models/user';

/** User state. */
export interface UserState {

  /** Current user. */
  readonly user: User | null;

  /** Error. */
  readonly error?: string;

  /** Whether the user is loading or not. */
  readonly isLoading: boolean;

}

export const initialState: UserState = {
  isLoading: false,
  user: null,
};
