import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { Api } from '../api/api';

const RECEIVING_LIMIT = 10;

/** Request parameters management service. */
export class QueryParamsService {
  private static instance: QueryParamsService;

  private readonly urlSearchParams: URLSearchParams;

  private constructor() {
    this.urlSearchParams = new URLSearchParams();
    this.urlSearchParams.set('limit', String(RECEIVING_LIMIT));
  }

  /** Gives access to an instance of the class. */
  public static getInstance(): QueryParamsService {
    if (!this.instance) {
      QueryParamsService.instance = new QueryParamsService();
    }

    return QueryParamsService.instance;
  }

  /**
   * Sets the value of the sorting field.
   * @param sortingTarget New sorting target.
   */
  public setSortingTarget(sortingTarget: string): void {
    this.urlSearchParams.set('ordering', sortingTarget);
  }

  /**
   * Sets the new page number.
   * @param page New page number.
   */
  public setPage(page: number): void {
    this.urlSearchParams.set('offset', String(page * RECEIVING_LIMIT));
  }

  /** Returns the current page number. */
  public getPage(): number {
    const offset = this.urlSearchParams.get('offset');
    return Math.floor(Number(offset) / RECEIVING_LIMIT);
  }

  /**
   * Calculates the total number of pages.
   * @param count Total number of items received.
   */
  public getTotalPages(count: number): number {
    return Math.ceil(count / RECEIVING_LIMIT);
  }

  /** Gets a list of anime by query parameters. */
  public async getAnimeList(): Promise<Pagination<Anime>> {
    const pagination = await Api.animeApi.getPagination(this.urlSearchParams);

    return pagination;
  }
}
