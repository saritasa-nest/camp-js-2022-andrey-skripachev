import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AnimeSeriesMapper } from './animeSeries.mapper';

export namespace AnimeMapper {

  /**
   * Maps dto to model.
   * @param dto  Anime dto.
   * @param limit Total count of anime.
   * @param offset The number of the first received element.
   */
  export function fromDto(dto: AnimeDto, limit: number, offset: number): Anime {
    return new Anime({
      captionInfo: `${offset + 1}-${Math.min(offset + limit + 1, dto.count)} of ${dto.count}`,
      animeSeries: dto.results.map(item => AnimeSeriesMapper.fromDto(item)),
    });
  }
}
