/** State of the sorting mode switch button. */
export interface SortingDirection {

  /** The text content of the sort button. */
  readonly text: string;

  /** Prefix added to the request when the button is pressed. */
  readonly value: string;
}

/** Selectors of the pagination block. */
export interface PaginationSelector {

  /** Block containing numbered buttons. */
  readonly block: string;

  /** Button to go to the previous page. */
  readonly buttonPrevious: string;

  /** Button to go to the next page. */
  readonly buttonNext: string;
}

export interface RequestParameter {
  readonly name: string;
  readonly value: number | string;
}
