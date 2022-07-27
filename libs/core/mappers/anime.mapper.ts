import { Anime } from '../models/anime';
import { mapAnimeTypeFromDto } from '../utils/types/animeType';
import { mapAnimeStatusFromDto } from '../utils/types/animeStatus';

import { AnimeDto } from '../dtos/anime.dto';

import { DateTimeRangeMapper } from './dateTimeRange.mapper';

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
