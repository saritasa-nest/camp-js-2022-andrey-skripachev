import { DateTimeRangeDto } from './dateTimeRange.dto';

/** Anime statuses receives from backend. */
export enum AnimeStatusDto {
  AIRING = 'AIRING',
  FINISHED = 'FINISHED',
  NOT_YET_AIRED = 'NOT_YET_AIRED',
}

/** Anime types receives from backend. */
export enum AnimeTypeDto {
  TV = 'TV',
  OVA = 'OVA',
  MOVIE = 'MOVIE',
  SPECIAL = 'SPECIAL',
  ONA = 'ONA',
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
  readonly title_eng: string;

  /** Anime name in Japanese. */
  readonly title_jpn: string;

  /** Type of anime. */
  readonly type: AnimeTypeDto;
}
