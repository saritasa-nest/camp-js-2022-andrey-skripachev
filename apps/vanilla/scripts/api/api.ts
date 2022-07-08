import { AnimeDto } from "@js-camp/core/dtos/anime.dto";
import { AnimeMapper } from "@js-camp/core/mappers/anime.mapper";
import { PaginationMapper } from "@js-camp/core/mappers/pagination.mapper";
import { Anime } from "@js-camp/core/models/anime";
import { Pagination } from "@js-camp/core/models/pagination";

import { RequestPrefix } from "../variables/constants";

import { RequestParameter } from "../variables/interfaces"

import { httpClient } from "./client"

export namespace Api {
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
    let limit = 0;
    let offset = 0;

    export async function collectAnime(parameters: Array<RequestParameter>): Promise<void> {
      const url = createUrl(RequestPrefix.ANIME_LIST, parameters);
      const request = await httpClient.get<AnimeDto>(url);
      const response = request.data;

      limit = Number(parameters.find(({ name }) => name === 'limit')?.value);
      offset = Number(parameters.find(({ name }) => name === 'offset')?.value);

      pagination = PaginationMapper.fromDto({
        count: response.count,
        limit,
        offset,
      });

      animeTable = AnimeMapper.fromDto(response, limit, offset);
    }

    export function getAnimeTable(): Anime {
      return animeTable;
    }

    export function getPagination(): Pagination {
      return pagination;
    }
  }
}
