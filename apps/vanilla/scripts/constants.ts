import { SortingDirection } from './interfaces';

/** Request. */
export const LIMIT = 10;

/** Selectors. */
export namespace AnimeSelector {
  export const TABLE_BODY = '#anime-table .table-body';
  export const CAPTION = '#anime-page--data';
  export const ROW = 'anime-table--row';
  export const CELL = 'anime-table-row-data';
  export const TABLE_IMAGE = 'table-image';
}

export namespace PaginationSelector {
  export const BLOCK = '#compressed-pagination';
  export const BUTTON_PREVIOUS = '#pagination-controls .left > button';
  export const BUTTON_NEXT = '#pagination-controls .right > button';
}

export namespace SortingSelector {
  export const BLOCK = '#anime-table .sort';
  export const TOGGLE_BUTTON = 'button.toggle-button';
  export const SELECT_ORDERING_BUTTON = 'button.select-ordering-button';
}

/** Sorting data. */
export const DIRECTIONS: readonly SortingDirection[] = [
  {
    text: '&#8593;',
    requestPrefix: '',
  },
  {
    text: '&#8595;',
    requestPrefix: '-',
  },
];

/** Other. */
export const DISABLED = 'disabled';
export const RANGE = 2;
