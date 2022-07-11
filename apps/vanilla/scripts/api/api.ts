import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { RequestPrefix } from '../variables/constants';

import { RequestParameter } from '../variables/interfaces';

import { httpClient } from './client';

export namespace Api {

  /**
   * Creates a URL from the prefix and query parameters.
   * @param prefix Part of the request before the parameters.
   * @param parameters Parameters of the request.
   * @returns URL from the prefix and query parameters.
   */
  function createUrl(prefix: string, parameters: Array<RequestParameter>): string {
    let url = prefix;
    if (parameters.length !== 0) {
      const options = parameters.map(({ name, value }) => `${name}=${value}`).join('&');
      url += `?${options}`;
    }
    return url;
  }

  export namespace AnimeApi {
    let pagination: Pagination;
    let animeTable: Anime;

    /**
     * Gets a list of anime, converts it for pagination and display in a table, and saves them in the cache.
     * @param parameters Parameters of the request.
     */
    export async function collectAnime(parameters: Array<RequestParameter>): Promise<void> {
      const url = createUrl(RequestPrefix.ANIME_LIST, parameters);
      const request = await httpClient.get<AnimeDto>(url);
      const response = request.data;

      const limitParameter = parameters.find(({ name }) => name === 'limit');
      const offsetParameter = parameters.find(({ name }) => name === 'offset');

      const limit = limitParameter ? Number(limitParameter.value) : 0;
      const offset = offsetParameter ? Number(offsetParameter.value) : 0;

      pagination = PaginationMapper.fromDto({
        count: response.count,
        limit,
        offset,
      });

      animeTable = AnimeMapper.fromDto(response, limit, offset);
    }

    /**
     * @returns Data to be displayed in the table.
     */
    export function getAnimeTable(): Anime {
      return animeTable;
    }

    /**
     * @returns Data to be displayed in the pagination.
     */
    export function getPagination(): Pagination {
      return pagination;
    }
  }
}
