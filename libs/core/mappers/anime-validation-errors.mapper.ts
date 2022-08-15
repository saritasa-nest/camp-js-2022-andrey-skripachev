import { AnimeValidationErrorsDto } from '../dtos/anime-validation-error.dto';
import { AnimeValidationErrors } from '../models/anime-validation-errors';

import { DateTimeRangeValidationErrorsMapper } from './date-time-range-validation-errors.mapper';

export namespace AnimeValidationErrorsMapper {

  /**
   * Maps dto to model.
   * @param dto Anime validation errors dto.
   */
  export function fromDto(
    dto: AnimeValidationErrorsDto,
  ): AnimeValidationErrors {
    return {
      image: dto.image,
      trailerYoutubeId: dto.trailer_youtube_id,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: dto.type,
      status: dto.status,
      source: dto.source,
      isAiring: dto.airing,
      aired: DateTimeRangeValidationErrorsMapper.fromDto(dto.aired),
      rating: dto.rating,
      season: dto.season,
      synopsis: dto.synopsis,
      background: dto.background,
      studiosData: dto.studios,
      genresData: dto.genres,
    };
  }

}
