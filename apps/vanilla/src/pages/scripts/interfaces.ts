import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime } from '@js-camp/core/models/anime';

/** The structure of the received anime series.*/
export interface AnimeData {

  /** Count: total number of anime series.*/
  readonly count: number;

  /** Next: next request page.*/
  readonly next: string | null;

  /** Previous: previous request page.*/
  readonly previous: string | null;

  /** Results: list of anime received on request.*/
  readonly results: AnimeDto[];
}

/** Request data.*/
export interface AnimeRequestData {

  /** Count: Total number of anime series.*/
  readonly count: number;

  /** Results: list of anime received on request converted from dto.*/
  readonly results: Anime[];

  /** Offset: offset on request.*/
  readonly offset: number;

  /** Limit: maximum number of received anime series.*/
  readonly limit: number;
}

/** Data converted from dto. */
export interface AnimeDataFromDto {

  /** Count: Total number of anime series.*/
  readonly count: number;

  /** Results: list of anime received on request converted from dto.*/
  readonly results: Anime[];
}
