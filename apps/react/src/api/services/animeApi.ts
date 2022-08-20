import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { http } from '..';

export namespace AnimeService {

  const defaultSearchParams = new URLSearchParams({
    limit: '10',
    offset: '0',
    ordering: 'id',
  });

  /**
   * Gets pagination with first anime of anime list.
   */
  export async function getFirstPageOfAnimeList(): Promise<Pagination<Anime>> {
    const animeResponse = await http.get<PaginationDto<AnimeDto>>('anime/anime/', {
      params: defaultSearchParams,
    });

    return PaginationMapper.fromDto(animeResponse.data, AnimeMapper.fromDto);
  }

  /**
   * Fetches pagination with anime by url string.
   * @param urlString URL string.
   */
  export async function getAnimeList(urlString: string): Promise<Pagination<Anime>> {
    const animeResponse = await http.get<PaginationDto<AnimeDto>>('', {
      baseURL: urlString,
    });

    return PaginationMapper.fromDto(animeResponse.data, AnimeMapper.fromDto);
  }
}
