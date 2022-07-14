/** Sort class constructor. */
export interface SortingConstructor{

  /** Sorting buttons. */
  readonly elements: HTMLButtonElement | null;

  /** Element showing sorting direction. */
  readonly direction: HTMLSpanElement | null;

  /** The class name of the selected button. */
  readonly selected: string;

  /** Changing the sorting target. */
  readonly changeSortField: (sortingTarget: string) => void;
}

/** Pagination class constructor. */
export interface PaginationConstructor {

  /** Element containing numbered pagination buttons. */
  readonly pagination: HTMLDivElement | null;

  /** Button to go to the next page. */
  readonly buttonNext: HTMLButtonElement | null;

  /** Button to go to the previous page. */
  readonly buttonPrevious: HTMLButtonElement | null;

  /** The class name of the selected button. */
  readonly buttonSelected: string;

  /** Class name of the unselected button. */
  readonly buttonNotSelected: string;

  /** Changing the view page. */
  readonly changePage: (page: number) => void;
}
