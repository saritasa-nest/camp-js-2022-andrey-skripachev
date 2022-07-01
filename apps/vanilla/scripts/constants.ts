/** Request. */
export const LIMIT = 10;

/** Selectors. */
export const ANIME_TABLE_SELECTOR = '#anime-table';
export const ANIME_TABLE_CAPTION_SELECTOR = '#anime-page--data';
export const PAGINATION_SELECTOR = '#compressed-pagination';
export const PAGINATION_BUTTON_PREV_SELECTOR = '#pagination-controls .left button';
export const PAGINATION_BUTTON_NEXT_SELECTOR = '#pagination-controls .right button';
export const SORTING_BLOCK_SELECTOR = '#anime-table .sort';
export const TOGGLE_BUTTON_SELECTOR = 'button.toggle-button';
export const SELECT_ORDERING_BUTTON_SELECTOR = 'button.select-ordering-button';

/** Class names. */
export const ANIME_TABLE_ROW_CLASS_NAME = 'anime-table--row';
export const ANIME_TABLE_CELL_CLASS_NAME = 'anime-table-row-data';

/** Sorting data. */
export const DIRECTIONS = [
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
export const DIS = 'disabled';
