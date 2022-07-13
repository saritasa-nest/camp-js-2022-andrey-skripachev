import { AnimeListDto } from '../dtos/animeList.dto';
import { AnimeList } from '../models/animeList';

import { AnimeMapper } from './anime.mapper';

export namespace AnimeListMapper {

  /**
   * Maps dto to model.
   * @param dto  Anime dto.
   * @param limit Total count of anime.
   * @param offset The number of the first received element.
   */
  export function fromDto(dto: AnimeListDto, limit: number, offset: number): AnimeList {
    return new AnimeList({
      positionInfo: `${offset + 1}-${Math.min(offset + limit + 1, dto.count)} of ${dto.count}`,
      anime: dto.results.map(item => AnimeMapper.fromDto(item)),
    });
  }
}
