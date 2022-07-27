import { AnimeTypeDto } from '../../dtos/anime.dto';

/** Different types of anime. */
export enum AnimeType {
  TV = 'TV',
  OVA = 'OVA',
  Movie = 'Movie',
  Special = 'Special',
  ONA = 'ONA',
  Music = 'Music',
}

const TYPE_FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
  [AnimeTypeDto.MOVIE]: AnimeType.Movie,
  [AnimeTypeDto.MUSIC]: AnimeType.Music,
  [AnimeTypeDto.ONA]: AnimeType.ONA,
  [AnimeTypeDto.OVA]: AnimeType.OVA,
  [AnimeTypeDto.SPECIAL]: AnimeType.Special,
  [AnimeTypeDto.TV]: AnimeType.TV,
};

const MAP_TO_READABLE_TYPE: Readonly<Record<AnimeType, string>> = {
  [AnimeType.Movie]: 'Movie',
  [AnimeType.Music]: 'Music',
  [AnimeType.ONA]: 'ONA',
  [AnimeType.OVA]: 'OVA',
  [AnimeType.Special]: 'Special',
  [AnimeType.TV]: 'TV',
};

/**
 * Mapper for anime type.
 * @param typeDto Type dto.
 */
export function mapAnimeTypeFromDto(typeDto: AnimeTypeDto): AnimeType {
  return TYPE_FROM_DTO[typeDto];
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
