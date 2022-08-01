import { Anime } from '../models/anime';

import { AnimeStatus } from '../utils/types/animeStatus';
import { AnimeType } from '../utils/types/animeType';

import { AnimeDto, AnimeTypeDto, AnimeStatusDto } from '../dtos/anime.dto';

import { DateTimeRangeMapper } from './dateTimeRange.mapper';

const TYPE_FROM_DTO: Readonly<Record<AnimeTypeDto, AnimeType>> = {
  [AnimeTypeDto.MOVIE]: AnimeType.Movie,
  [AnimeTypeDto.MUSIC]: AnimeType.Music,
  [AnimeTypeDto.ONA]: AnimeType.ONA,
  [AnimeTypeDto.OVA]: AnimeType.OVA,
  [AnimeTypeDto.SPECIAL]: AnimeType.Special,
  [AnimeTypeDto.TV]: AnimeType.TV,
};

/**
 * Mapper for anime type.
 * @param typeDto Type dto.
 */
export function mapAnimeTypeFromDto(typeDto: AnimeTypeDto): AnimeType {
  return TYPE_FROM_DTO[typeDto];
}

/**
 * Checks if the value is a anime type dto.
 * @param value Value, possibly being a anime type dto.
 * @returns
 */
export function isTypeDto(value: string): value is AnimeTypeDto {
  return Object.keys(AnimeTypeDto).includes(value);
}

const STATUS_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
  [AnimeStatusDto.AIRING]: AnimeStatus.Airing,
  [AnimeStatusDto.FINISHED]: AnimeStatus.Finished,
  [AnimeStatusDto.NOT_YET_AIRED]: AnimeStatus.NotYetAired,
};

/**
 * Mapper for anime status.
 * @param statusDto Status dto.
 */
export function mapAnimeStatusFromDto(statusDto: AnimeStatusDto): AnimeStatus {
  return STATUS_FROM_DTO[statusDto];
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
      status: mapAnimeStatusFromDto(dto.status),
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: mapAnimeTypeFromDto(dto.type),
    });
  }
}
