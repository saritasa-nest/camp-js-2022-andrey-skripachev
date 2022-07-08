import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AnimeSeriesMapper } from './animeSeries.mapper';

export namespace AnimeMapper {

  export function fromDto(dto: AnimeDto, limit: number, offset: number): Anime {
    return new Anime({
      count: dto.count,
      animeSeries: dto.results.map(item => AnimeSeriesMapper.fromDto(item)),
      limit,
      offset,
    });
  }
}
