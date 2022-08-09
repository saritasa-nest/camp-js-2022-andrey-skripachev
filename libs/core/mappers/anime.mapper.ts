import { Anime } from '../models/anime';

import { AnimeStatus } from '../utils/types/animeStatus';
import { AnimeType } from '../utils/types/animeType';

import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';

import { DateTimeRangeMapper } from './date-time-range.mapper';
import { mapAnimeStatusFromDto } from './anime-status.mapper';
import { mapAnimeTypeFromDto } from './anime-type.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto Anime series dto.
   */
  export function fromDto(dto: AnimeDto): Anime {
    return new Anime({
      aired: DateTimeRangeMapper.fromDto(dto.aired),
      id: dto.id,
      image: dto.image,
      status: mapAnimeStatusFromDto(dto.status),
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: mapAnimeTypeFromDto(dto.type),
    });
  }
}
