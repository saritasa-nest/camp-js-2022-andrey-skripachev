import { SortingDirection } from './interfaces';

/** Request. */
export const LIMIT = 10;

/** Selectors. */
export namespace AnimeSelector {
  export const TABLE_BODY_SELECTOR = '#anime-table .table-body';
  export const CAPTION_ID = '#anime-page--data';
  export const ROW_CLASS = 'anime-table--row';
  export const CELL_CLASS = 'anime-table-row-data';
  export const TABLE_IMAGE_CLASS = 'table-image';
}

export namespace PaginationSelector {
  export const BLOCK_ID = '#compressed-pagination';
  export const BUTTON_PREVIOUS = '#pagination-controls .left > button';
  export const BUTTON_NEXT = '#pagination-controls .right > button';
}

export namespace SortingSelector {
  export const BLOCK_ID = '#anime-table .sort';
  export const TOGGLE_BUTTON = 'button.toggle-button';
  export const SELECT_ORDERING_BUTTON = 'button.select-ordering-button';
}

/** Sorting data. */
export const DIRECTIONS: readonly SortingDirection[] = [
  {
    text: '↑',
    requestPrefix: '',
  },
  {
    text: '↓',
    requestPrefix: '-',
  },
];

/** Other. */
export const DISABLED = 'disabled';
export const RANGE = 2;
