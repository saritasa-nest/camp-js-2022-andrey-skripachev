import { Anime } from '../models/anime';

import { AnimeStatus } from '../utils/types/animeStatus';

import { AnimeDto, AnimeStatusDto } from '../dtos/anime.dto';
import { EnumMapper } from '../enums/enums';

import { DateTimeRangeMapper } from './dateTimeRange.mapper';
import { mapAnimeTypeFromDto } from './animeType.mapper';

export const STATUS_FROM_DTO_MAP: EnumMapper<AnimeStatusDto, AnimeStatus> = {
  [AnimeStatusDto.AIRING]: AnimeStatus.Airing,
  [AnimeStatusDto.FINISHED]: AnimeStatus.Finished,
  [AnimeStatusDto.NOT_YET_AIRED]: AnimeStatus.NotYetAired,
};

/**
 * Mapper for anime status.
 * @param statusDto Status dto.
 */
export function mapAnimeStatusFromDto(statusDto: AnimeStatusDto): AnimeStatus {
  return STATUS_FROM_DTO_MAP[statusDto];
}

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
      status: STATUS_FROM_DTO_MAP[dto.status],
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: mapAnimeTypeFromDto(dto.type),
    });
  }
}
