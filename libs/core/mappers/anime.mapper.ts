import { Anime } from '../models/anime';

import { AnimeDto } from '../dtos/anime.dto';

import { DateTimeRangeMapper } from './dateTimeRange.mapper';
import { MAP_STATUS_FROM_DTO } from './anime-status.mapper';
import { MAP_TYPE_FROM_DTO } from './anime-type.mapper';

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
      status: MAP_STATUS_FROM_DTO[dto.status],
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: MAP_TYPE_FROM_DTO[dto.type],
    });
  }
}
