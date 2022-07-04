import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime } from '@js-camp/core/models/anime';

/** The structure of the received anime series.*/
export interface AnimeData {

  /** Total number of anime series.*/
  readonly count: number;

  /** Next request page.*/
  readonly next: string | null;

  /** Previous request page.*/
  readonly previous: string | null;

  /** List of anime received on request.*/
  readonly results: AnimeDto[];
}

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
