/** Different types of anime. */
export enum AnimeType {
  TV = 'TV',
  OVA = 'OVA',
  MOVIE = 'MOVIE',
  SPECIAL = 'SPECIAL',
  ONA = 'ONA',
  MUSIC = 'MUSIC',
}

const MAP_TO_READABLE_TYPE: Readonly<Record<AnimeType, string>> = {
  [AnimeType.MOVIE]: 'Movie',
  [AnimeType.MUSIC]: 'Music',
  [AnimeType.ONA]: 'ONA',
  [AnimeType.OVA]: 'OVA',
  [AnimeType.SPECIAL]: 'Special',
  [AnimeType.TV]: 'TV',
};

/**
 * Checks if the value is a type.
 * @param value Value, possibly being a type.
 */
export function isType(value: string): value is AnimeType {
  return Object.keys(AnimeType).includes(value as AnimeType);
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
   * Converts the value to a type if it exists in the types.
   * @param value String for conversion.
   */
  export function toAnimeType(value: string): AnimeType | null {
    return isType(value) ? value : null;
  }

}
