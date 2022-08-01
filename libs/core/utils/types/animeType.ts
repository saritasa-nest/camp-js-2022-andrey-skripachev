/** Different types of anime. */
export enum AnimeType {
  TV = 'TV',
  OVA = 'OVA',
  Movie = 'Movie',
  Special = 'Special',
  ONA = 'ONA',
  Music = 'Music',
}

const MAP_TO_READABLE_TYPE: Readonly<Record<AnimeType, string>> = {
  [AnimeType.Movie]: 'Movie',
  [AnimeType.Music]: 'Music',
  [AnimeType.ONA]: 'ONA',
  [AnimeType.OVA]: 'OVA',
  [AnimeType.Special]: 'Special',
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
  export function toReadable(value: AnimeType): string {
    return MAP_TO_READABLE_TYPE[value];
  }

  /**
   * Converts the value to a type if it exists in the types.
   * @param value String for conversion.
   */
  export function toAnimeType(value: string): AnimeType | null {
    return isType(value) ? value : null;
  }

}
