import { AnimeTypeDto } from '../dtos/anime.dto';
import { EnumMapper, reverseEnumMapper } from '../enums/enums';
import { AnimeType } from '../utils/types/animeType';

const TYPE_FROM_DTO: EnumMapper<AnimeTypeDto, AnimeType> = {
  [AnimeTypeDto.MOVIE]: AnimeType.Movie,
  [AnimeTypeDto.MUSIC]: AnimeType.Music,
  [AnimeTypeDto.ONA]: AnimeType.ONA,
  [AnimeTypeDto.OVA]: AnimeType.OVA,
  [AnimeTypeDto.SPECIAL]: AnimeType.Special,
  [AnimeTypeDto.TV]: AnimeType.TV,
};

const TYPE_TO_DTO = reverseEnumMapper(TYPE_FROM_DTO);

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
 * Checks if the value is a anime type dto.
 * @param value Value, possibly being a anime type dto.
 * @returns
 */
export function isTypeDto(value: string): value is AnimeTypeDto {
  return Object.keys(AnimeTypeDto).includes(value);
}
