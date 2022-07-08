import { SortingDirection } from './interfaces';

/** Request. */
export const LIMIT = 10;

/** Selectors. */
export namespace AnimeSelector {
  export const TABLE_BODY = '#anime-table .table-body';
  export const CAPTION = '#anime-page--data';
  export const ROW = 'anime-table__row';
  export const CELL = 'anime-table-row-data';
  export const TABLE_IMAGE = 'table-image';
}

export namespace PaginationElements {
  export const BLOCK = '#compressed-pagination';
  export const BUTTON_PREVIOUS = '#pagination-controls .left > button';
  export const BUTTON_NEXT = '#pagination-controls .right > button';
  export const BUTTON_SELECTED = 'lighten-3';
  export const BUTTON_NOT_SELECTED = 'lighten-5';
}

export namespace SortingElements {
  export const BLOCK = '#anime-table .sort';
  export const TOGGLE_DIRECTION = '.sorting-direction';
  export const SELECTED_FIELD = 'ordering-selected';
}

export namespace RequestPrefix {
  export const ANIME_LIST = 'anime/anime/';
}

/** Other. */
export const DISABLED = 'disabled';
export const ENABLED = 'enabled';
export const RANGE = 2;

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
