import { SortingDirection } from './interfaces';

/** Request. */
export const LIMIT = 10;

/** Selectors. */
export namespace AnimeTableElements {
  export const TABLE_BODY = '.anime-table .table__body';
  export const CAPTION = '.anime-table .table__caption';
  export const ROW = 'table__row';
  export const CELL = 'table_cell';
  export const TABLE_IMAGE = 'table__image';
}

export namespace PaginationElements {
  export const BLOCK = '.compressed-pagination';
  export const BUTTON_PREVIOUS = '.pagination__previous';
  export const BUTTON_NEXT = '.pagination__next';
  export const BUTTON_SELECTED = 'lighten-3';
  export const BUTTON_NOT_SELECTED = 'lighten-5';
  export const BUTTON = 'pagination__button';
}

export namespace SortingElements {
  export const ELEMENT = '.sort';
  export const DIRECTION = '.sorting-direction';
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

export const TOP_OF_PAGE = 0;
