import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { QueryParameter } from '../variables/interfaces';

import { httpClient } from './client';
import { QueryParameters } from './request';

/** Getting anime data. */
export class GetAnimeApi {

  private createUrl: (baseUrl: string, parameters: QueryParameter[]) => string;

  private requestBaseUrl: string;

  private anime: Anime | null;

  private pagination: Pagination | null;

  public constructor(createUrl: (baseUrl: string, parameters: Array<QueryParameter>) => string, prefix: string) {
    this.createUrl = createUrl;
    this.requestBaseUrl = prefix;
    this.anime = null;
    this.pagination = null;
  }

  /**
   * Collects and saves data for anime and pagination.
   * @param parameters Parameters of the request.
   */
  public async collectAnime(parameters: QueryParameters): Promise<void> {
    const urlSearchParams = this.createUrl(this.requestBaseUrl, parameters.getOptions());
    const request = await httpClient.get<AnimeDto>(urlSearchParams);
    const response = request.data;

    const limit = Number(parameters.getOption('limit'));
    const offset = Number(parameters.getOption('offset'));

    this.pagination = PaginationMapper.fromDto({
      count: response.count,
      limit,
      offset,
    });

    this.anime = AnimeMapper.fromDto(response, limit, offset);
  }

  /**
   * @returns Anime info.
   */
  public getAnime(): Anime {
    if (this.anime === null) {
      throw new Error('Anime is not defined');
    }

    return this.anime;
  }

  /**
   * @returns Pagination info.
   */
  public getPagination(): Pagination {
    if (this.pagination === null) {
      throw new Error('Pagination is not defined');
    }

    return this.pagination;
  }
}
