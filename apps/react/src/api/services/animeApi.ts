import { AnimeDetailsDto } from '@js-camp/core/dtos/anime-details.dto';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/anime-details.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { QueryParamsMapper } from '@js-camp/core/mappers/query-params.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { Pagination } from '@js-camp/core/models/pagination';
import { QueryParams } from '@js-camp/core/models/query-params';

import { http } from '..';

export namespace AnimeService {

  /**
   * Gets pagination with first anime of anime list.
   * @param searchParams List search parameters.
   */
  export async function getFirstPageOfAnimeList(searchParams: QueryParams): Promise<Pagination<Anime>> {
    const animeResponse = await http.get<PaginationDto<AnimeDto>>('anime/anime/', {
      params: QueryParamsMapper.toDto(searchParams),
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

  /**
   * Fetches anime by id.
   * @param id Anime id.
   */
  export async function getAnimeById(id: string): Promise<AnimeDetails> {
    const animeResponse = await http.get<AnimeDetailsDto>(`anime/anime/${id}/`);

    return AnimeDetailsMapper.fromDto(animeResponse.data);
  }
}
