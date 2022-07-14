/** State of the sorting mode switch button. */
export interface SortingDirection {

  /** The text content of the sort button. */
  readonly text: string;

  /** Prefix added to the request when the button is pressed. */
  readonly value: string;
}

export namespace SortingElements {
  export const ELEMENT = 'sort';
  export const DIRECTION = 'sorting-direction';
  export const SELECTED_FIELD = 'ordering-selected';
}

const SORTING_INCREMENT: SortingDirection = {
  text: '&#8593;',
  value: '',
};
const SORTING_DECREMENT: SortingDirection = {
  text: '&#8595;',
  value: '-',
};

export const SORTING_DIRECTIONS = [
  SORTING_INCREMENT,
  SORTING_DECREMENT,
];

export const DEFAULT_DIRECTION = 0;
