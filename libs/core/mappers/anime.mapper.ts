import { Anime } from '../models/anime';

import { AnimeStatus } from '../utils/types/animeStatus';
import { AnimeType } from '../utils/types/animeType';

import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from '../dtos/anime.dto';

import { DateTimeRangeMapper } from './date-time-range.mapper';
import { mapAnimeStatusFromDto, mapAnimeStatusToDto } from './anime-status.mapper';
import { mapAnimeTypeFromDto, mapAnimeTypeToDto } from './anime-type.mapper';
import { domainToASCII } from 'url';

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

  export function toDto(model: Anime): AnimeDto {
    return {
      aired: DateTimeRangeMapper.toDto(model.aired),
      id: model.id,
      image: model.image,
      status: mapAnimeStatusToDto(model.status),
      title_eng: model.titleEnglish,
      title_jpn: model.titleJapanese,
      type: mapAnimeTypeToDto(model.type),
    }
  }
}
