import { AnimeDto } from './dtos/anime.dto';
import { Anime } from '../../models/anime';
import { AnimeType } from '../../utils/types/animeType';
import { AnimeStatus } from '../../utils/types/animeStatus';

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
      status: AnimeStatus.toAnimeStatus(dto.status),
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: AnimeType.toAnimeType(dto.type),
    });
  }
}
