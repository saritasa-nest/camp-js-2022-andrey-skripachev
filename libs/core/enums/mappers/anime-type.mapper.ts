import { AnimeTypeDto } from '../dto/anime-type.dto';
import { AnimeType } from '../models/anime-type';

import { mapEnumValue } from './enum.mapper';

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

/**
 * Maps dto to model.
 * @param dto Anime type dto.
 */
export function mapAnimeTypeFromDto(dto: AnimeTypeDto): AnimeType {
  return mapEnumValue(dto, TYPE_FROM_DTO);
}

/**
 * Maps model to dto.
 * @param type Anime type.
 */
export function mapAnimeTypeToDto(type: AnimeType): AnimeTypeDto {
  return mapEnumValue(type, TYPE_TO_DTO);
}
