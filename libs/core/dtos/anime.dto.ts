import { DateTimeRangeDto } from './date-time-range.dto';

/** Acceptable values of anime statuses. */
export enum AnimeStatusDto {
  AIRING = 'AIRING',
  FINISHED = 'FINISHED',
  NOT_YET_AIRED = 'NOT_YET_AIRED',
}

/**
 * Acceptable values of anime types.
 */
export enum AnimeTypeDto {

  /** Anime for TV. */
  TV = 'TV',

  /** Anime for promotional purposes. */
  OVA = 'OVA',

  /** Full-meter animation movie. */
  MOVIE = 'MOVIE',

  /** Anime episodes that aren't part of the original show. */
  SPECIAL = 'SPECIAL',

  /** Anime that is directly released onto the Internet. */
  ONA = 'ONA',

  /** Musical anime. */
  MUSIC = 'MUSIC',
}

/** Transfer object for anime. */
export interface AnimeDto {

  /** Anime start and end dates. */
  readonly aired: DateTimeRangeDto;

  /** Anime ID. */
  readonly id: number;

  /** Image link to the anime. */
  readonly image: string;

  /** Status of anime. */
  readonly status: AnimeStatusDto;

  /** Anime name in English. */
  readonly title_eng?: string;

  /** Anime name in Japanese. */
  readonly title_jpn?: string;

  /** Type of anime. */
  readonly type: AnimeTypeDto;
}
