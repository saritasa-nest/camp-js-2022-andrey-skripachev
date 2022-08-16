/** Sorting field. */
export interface Sorting {

  /** Sorting target. */
  readonly target: string;

  /** Sorting direction. */
  readonly direction: SortingDirection;
}

export type SortingDirection = 'inc' | 'dec' | '';
