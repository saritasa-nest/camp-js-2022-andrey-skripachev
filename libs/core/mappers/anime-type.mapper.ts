import { AnimeTypeDto } from '../dtos/anime.dto';
import { AnimeType } from '../utils/types/animeType';

const TYPE_FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
  [AnimeTypeDto.MOVIE]: AnimeType.Movie,
  [AnimeTypeDto.MUSIC]: AnimeType.Music,
  [AnimeTypeDto.ONA]: AnimeType.ONA,
  [AnimeTypeDto.OVA]: AnimeType.OVA,
  [AnimeTypeDto.SPECIAL]: AnimeType.Special,
  [AnimeTypeDto.TV]: AnimeType.TV,
};

/**
 * Maps anime type from dto to model.
 * @param typeDto Type dto.
 */
export function mapAnimeTypeFromDto(typeDto: AnimeTypeDto): AnimeType {
  return TYPE_FROM_DTO[typeDto];
}

const TYPE_TO_DTO: Readonly<Record<AnimeType, AnimeTypeDto>> = {
  [AnimeType.Movie]: AnimeTypeDto.MOVIE,
  [AnimeType.Music]: AnimeTypeDto.MUSIC,
  [AnimeType.ONA]: AnimeTypeDto.ONA,
  [AnimeType.OVA]: AnimeTypeDto.OVA,
  [AnimeType.Special]: AnimeTypeDto.SPECIAL,
  [AnimeType.TV]: AnimeTypeDto.TV,
};

/**
 * Maps anime type from model to dto.
 * @param type Type model.
 */
export function mapAnimeTypeToDto(type: AnimeType): AnimeTypeDto {
  return TYPE_TO_DTO[type];
}

/**
 * Checks if the value is a anime type dto.
 * @param value Value, possibly being a anime type dto.
 * @returns
 */
export function isTypeDto(value: string): value is AnimeTypeDto {
  return Object.keys(AnimeTypeDto).includes(value);
}
