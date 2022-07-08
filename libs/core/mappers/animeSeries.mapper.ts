import { AnimeSeriesDto } from '../dtos/animeSeries.dto';

import { AnimeSeries } from '../models/animeSeries';

export namespace AnimeSeriesMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: AnimeSeriesDto): AnimeSeries {
    return new AnimeSeries({
      start: dto.aired.start,
      id: dto.id,
      image: dto.image,
      status: dto.status,
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: dto.type,
    });
  }
}
