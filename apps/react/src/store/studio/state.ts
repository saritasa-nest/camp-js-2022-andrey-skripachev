import { Studio } from '@js-camp/core/models/studio';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const entityAdapter = createEntityAdapter<Studio>({
  selectId: studio => studio.id,
});

/** Genre state. */
export interface StudioState {

  /** Error. */
  readonly error?: string;

  /** Whether the user is loading or not. */
  readonly isLoading: boolean;
}

export const initialState: StudioState = {
  isLoading: false,
};
