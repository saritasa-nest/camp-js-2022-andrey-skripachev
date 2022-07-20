import { AnimeDetails } from '../models/animeDetails';
import { AnimeDetailsDto } from '../dtos/animeDetails.dto';

import { AnimeStatus, AnimeType } from '../utils/types/anime';

import { GenreMapper } from './genre.mapper';
import { StudioMapper } from './studio.mapper';
import { DateTimeRangeMapper } from './dateTimeRange.mapper';

export namespace AnimeDetailsMapper {

  /**
   * Maps dto to model.
   * @param dto Anime details dto.
   */
  export function fromDto(dto: AnimeDetailsDto): AnimeDetails {
    const { id, image, synopsis, airing } = dto;

    return new AnimeDetails({
      aired: DateTimeRangeMapper.fromDto(dto.aired),
      status: AnimeStatus.toAnimeStatus(dto.status),
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: AnimeType.toAnimeType(dto.type),
      studios: dto.studios_data.map(StudioMapper.fromDto),
      genres: dto.genres_data.map(GenreMapper.fromDto),
      id,
      image,
      synopsis,
      airing,
    });
  }
}
