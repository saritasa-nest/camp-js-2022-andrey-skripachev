import { isStatus } from '../../guards/animeStatus';
import { isType } from '../../guards/animeType';

/** Different statuses of anime. */
export enum AnimeStatus {
  AIRING = 'Airing',
  FINISHED = 'Finished',
  NOT_YET_AIRED = 'Not yet aired',
}

const MAP_TO_READABLE_STATUS: Readonly<Record<AnimeStatus, string>> = {
  [AnimeStatus.AIRING]: 'Airing',
  [AnimeStatus.FINISHED]: 'Finished',
  [AnimeStatus.NOT_YET_AIRED]: 'Not yet aired',
};

/** Different types of anime. */
export enum AnimeType {
  TV = 'TV',
  OVA = 'OVA',
  MOVIE = 'Movie',
  SPECIAL = 'Special',
  ONA = 'ONA',
  MUSIC = 'Music',
}

const MAP_TO_READABLE_TYPE: Readonly<Record<AnimeType, string>> = {
  [AnimeType.MOVIE]: 'Movie',
  [AnimeType.MUSIC]: 'Music',
  [AnimeType.ONA]: 'ONA',
  [AnimeType.OVA]: 'OVA',
  [AnimeType.SPECIAL]: 'Special',
  [AnimeType.TV]: 'TV',
};

export namespace AnimeStatus {

  /**
   * Converts anime status into readable form.
   * @param value Anime status.
   */
  export function toReadable(value: AnimeStatus | null): string | null {
    return value !== null ? MAP_TO_READABLE_STATUS[value] : null;
  }

  /**
   * @param value String for conversion.
   */
  export function toAnimeStatus(value: string): AnimeStatus | null {
    return isStatus(value) ? value as AnimeStatus : null;
  }

}

export namespace AnimeType {

  /**
   * Converts anime type into readable form.
   * @param value Anime type.
   */
  export function toReadable(value: AnimeType | null): string | null {
    return value !== null ? MAP_TO_READABLE_TYPE[value] : null;
  }

  /**
   * @param value String for conversion.
   */
  export function toAnimeType(value: string): AnimeType | null {
    return isType(value) ? value as AnimeType : null;
  }

}
