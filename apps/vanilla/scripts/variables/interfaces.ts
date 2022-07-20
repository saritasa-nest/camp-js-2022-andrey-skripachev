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

  /** Default button class name. */
  readonly button: string;

  /** Class of the unselected button. */
  readonly selectedButton: string;

  /** Class of the selected button. */
  readonly notSelectedButton: string;
}

/** Selectors of the table using for insert anime. */
export interface AnimeTableSelector {

  /** Table. */
  readonly table: string;

  /** Table row. */
  readonly row: string;

  /** Table cell. */
  readonly cell: string;

  /** Table caption. */
  readonly caption: string;

  /** Table image. */
  readonly image: string;
}

/** Selectors of the sorting elements. */
export interface SortingSelector {

  /** Sorting buttons. */
  readonly elements: string;

  /** Element for displaying the direction. */
  readonly direction: string;

  /** Selected button. */
  readonly selected: string;
}

/** Request parameter. */
export interface QueryParameter {

  /** Parameter name. */
  readonly name: string;

  /** Parameter value. */
  readonly value: number | string;
}
