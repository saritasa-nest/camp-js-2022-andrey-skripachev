import { AnimeTypeDto } from '../dtos/anime.dto';
import { EnumMapper, reverseEnumMapper } from '../enums/enums';
import { AnimeType } from '../utils/types/animeType';

export const MAP_TYPE_FROM_DTO: EnumMapper<AnimeTypeDto, AnimeType> = {
  [AnimeTypeDto.MOVIE]: AnimeType.Movie,
  [AnimeTypeDto.MUSIC]: AnimeType.Music,
  [AnimeTypeDto.ONA]: AnimeType.ONA,
  [AnimeTypeDto.OVA]: AnimeType.OVA,
  [AnimeTypeDto.SPECIAL]: AnimeType.Special,
  [AnimeTypeDto.TV]: AnimeType.TV,
};

export const MAP_TYPE_TO_DTO = reverseEnumMapper(MAP_TYPE_FROM_DTO);
