export type AnimeTypeDto = 'TV' | 'OVA' | 'MOVIE' | 'SPECIAL' | 'ONA' | 'MUSIC';
export type AnimeStatusDto = 'AIRING' | 'FINISHED' | 'NOT_YET_AIRED';

export type AnimeType = 'TV' | 'OVA' | 'Movie' | 'Special' | 'ONA' | 'Music';
export type AnimeStatus = 'Airing' | 'Finished' | 'Not yet aired';

/** Different types of anime. */
export enum Type {
  TV = 'TV',
  OVA = 'OVA',
  MOVIE = 'Movie',
  SPECIAL = 'Special',
  ONA = 'ONA',
  MUSIC = 'Music',
  DEFAULT = '-',
}

/** Different statuses of anime. */
export enum Status {
  AIRING = 'Airing',
  FINISHED = 'Finished',
  NOT_YET_AIRED = 'Not yet aired',
  DEFAULT = '-',
}
