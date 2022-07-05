import { Anime } from '@js-camp/core/models/anime';

/** Request data.*/
export interface AnimeRequestData {

  /** Total number of anime series.*/
  readonly count: number;

  /** List of anime received on request converted from dto.*/
  readonly results: Anime[];

  /** Offset on request.*/
  readonly offset: number;

  /** Maximum number of received anime series.*/
  readonly limit: number;
}

/** Data converted from dto. */
export interface AnimeDataFromDto {

  /** Total number of anime series.*/
  readonly count: number;

  /** List of anime received on request converted from dto.*/
  readonly results: Anime[];
}

/** State of the sorting mode switch button. */
export interface SortingDirection {

  /** The text content of the sort button. */
  readonly text: string;

  /** Prefix added to the request when the button is pressed. */
  readonly requestPrefix: string;
}

/** Selectors of pagination interface elements. */
export interface Pagination {

  /** Block containing numbered buttons. */
  readonly blockSelector: string;

  /** Button to go to the previous page. */
  readonly buttonPreviousSelector: string;

  /** Button to go to the next page. */
  readonly buttonNextSelector: string;
}
