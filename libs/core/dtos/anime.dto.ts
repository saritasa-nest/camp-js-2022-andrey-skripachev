import { DateTimeRangeDto } from './date-time-range.dto';

/** Acceptable values of anime statuses. */
export enum AnimeStatusDto {
  AIRING = 'AIRING',
  FINISHED = 'FINISHED',
  NOT_YET_AIRED = 'NOT_YET_AIRED',
}



/** Acceptable anime sources. */
export enum AnimeSourceDto {
  FOUR_KOMA_MANGA = 'FOUR_KOMA_MANGA',
  BOOK = 'BOOK',
  CARD_GAME = 'CARD_GAME',
  GAME = 'GAME',
  LIGHT_NOVEL = 'LIGHT_NOVEL',
  MANGA = 'MANGA',
  MIXED_MEDIA = 'MIXED_MEDIA',
  MUSIC = 'MUSIC',
  NOVEL = 'NOVEL',
  ORIGINAL = 'ORIGINAL',
  PICTURE_BOOK = 'PICTURE_BOOK',
  RADIO = 'RADIO',
  VISUAL_NOVEL = 'VISUAL_NOVEL',
  WEB_MANGA = 'WEB_MANGA',
  WEB_NOVEL = 'WEB_NOVEL',
  OTHER = 'OTHER',
  UNKNOWN = 'UNKNOWN',
}

/** Acceptable anime rating. */
export enum AnimeRatingDto {
  G = 'G',
  PG = 'PG',
  PG_13 = 'PG_13',
  R_17 = 'R_17',
  R_PLUS = 'R_PLUS',
  R_X = 'R_X',
  UNKNOWN = 'UNKNOWN',
}

/** Anime seasons. */
export enum AnimeSeasonDto {
  SUMMER = 'SUMMER',
  WINTER = 'WINTER',
  SPRING = 'SPRING',
  FALL = 'FALL',
  NON_SEASONAL = 'NON_SEASONAL',
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
