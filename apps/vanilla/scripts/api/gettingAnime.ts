import { AnimeListDto } from '@js-camp/core/dtos/animeList.dto';
import { AnimeListMapper } from '@js-camp/core/mappers/animeList.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeList } from '@js-camp/core/models/animeList';
import { Pagination } from '@js-camp/core/models/pagination';

import { QueryParameter } from '../variables/interfaces';

import { httpClient } from './client';
import { QueryParameters } from './request';

/** Getting anime data. */
export class GetAnimeApi {

  private readonly createUrl: (baseUrl: string, parameters: readonly QueryParameter[]) => string;

  private readonly requestBaseUrl: string;

  private animeList: AnimeList | null;

  private pagination: Pagination | null;

  public constructor(createUrl: (baseUrl: string, parameters: readonly QueryParameter[]) => string, prefix: string) {
    this.createUrl = createUrl;
    this.requestBaseUrl = prefix;
    this.animeList = null;
    this.pagination = null;
  }

  /**
   * Collects and saves data for anime and pagination.
   * @param parameters Parameters of the request.
   */
  public async collectAnimeList(parameters: QueryParameters): Promise<void> {
    const urlSearchParams = this.createUrl(this.requestBaseUrl, parameters.getOptions());
    const request = await httpClient.get<AnimeListDto>(urlSearchParams);
    const response = request.data;

    const limit = Number(parameters.getOption('limit'));
    const offset = Number(parameters.getOption('offset'));

    this.pagination = PaginationMapper.fromDto({
      count: response.count,
      limit,
      offset,
    });

    this.animeList = AnimeListMapper.fromDto(response, limit, offset);
  }

  /**
   * @returns Anime info.
   */
  public getAnimeList(): AnimeList {
    if (this.animeList === null) {
      throw new Error('Anime is not defined');
    }

    return this.animeList;
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
