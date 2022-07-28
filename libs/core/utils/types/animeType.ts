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

const TYPE_TO_DTO: Readonly<Record<AnimeType, AnimeTypeDto>> = {
  [AnimeType.Movie]: AnimeTypeDto.MOVIE,
  [AnimeType.Music]: AnimeTypeDto.MUSIC,
  [AnimeType.ONA]: AnimeTypeDto.ONA,
  [AnimeType.OVA]: AnimeTypeDto.OVA,
  [AnimeType.Special]: AnimeTypeDto.SPECIAL,
  [AnimeType.TV]: AnimeTypeDto.TV,
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
 * Maps anime type from dto to model.
 * @param typeDto Type dto.
 */
export function mapAnimeTypeFromDto(typeDto: AnimeTypeDto): AnimeType {
  return TYPE_FROM_DTO[typeDto];
}

/**
 * Maps anime type from model to dto.
 * @param type Type model.
 */
export function mapAnimeTypeToDto(type: AnimeType): AnimeTypeDto {
  return TYPE_TO_DTO[type];
}

/**
 * Checks if the value is a type.
 * @param value Value, possibly being a type.
 */
export function isType(value: string): value is AnimeType {
  return Object.keys(AnimeType).includes(value as AnimeType);
}

/**
 * Checks if the value is a anime type dto.
 * @param value Value, possibly being a anime type dto.
 * @returns
 */
export function isTypeDto(value: string): value is AnimeTypeDto {
  return Object.keys(AnimeTypeDto).includes(value);
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
  export function toAnimeType(value: string): AnimeType {
    return isType(value) ? value : AnimeType.Movie;
  }

}
