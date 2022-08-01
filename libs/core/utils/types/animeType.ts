/** Different types of anime. */
export enum AnimeType {
  TV = 'TV',
  OVA = 'OVA',
  Movie = 'Movie',
  Special = 'Special',
  ONA = 'ONA',
  Music = 'Music',
}

/**
 * Checks if the value is a type.
 * @param value Value, possibly being a type.
 */
export function isType(value: string): value is AnimeType {
  return Object.keys(AnimeType).includes(value as AnimeType);
}

export namespace AnimeType {

  /**
   * Converts the value to a type if it exists in the types.
   * @param value String for conversion.
   */
  export function toAnimeType(value: string): AnimeType {
    return isType(value) ? value : AnimeType.Movie;
  }
}
