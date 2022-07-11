import { AnimeSeriesDto } from '../dtos/animeSeries.dto';
import { Status, Type } from '../enums/enums';

import { AnimeSeries } from '../models/animeSeries';

export namespace AnimeSeriesMapper {

  /**
   * Maps dto to model.
   * @param dto Anime series dto.
   */
  export function fromDto(dto: AnimeSeriesDto): AnimeSeries {
    let { start } = dto.aired;
    if (start instanceof Date) {
      start = start.toDateString();
    }
    return new AnimeSeries({
      start,
      id: dto.id,
      image: dto.image,
      status: Status[dto.status],
      titleEnglish: dto.title_eng,
      titleJapanese: dto.title_jpn,
      type: Type[dto.type],
    });
  }
}
