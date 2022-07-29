import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AnimeListSearchParams } from '../models/animeListSearchParams';

import { AnimeListSearchParamsMapper } from './mappers/animeListSearchParams.mapper';

/** Construct and redirecting by query search params. */
@Injectable({
  providedIn: 'root',
})
export class SearchParamsService {

  public constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  /**
   * Creates search params for anime list GET query.
   * @param data Construction data.
   */
  public changeSearchParams(data: AnimeListSearchParams): HttpParams {
    const newSearchParams = { ...AnimeListSearchParamsMapper.toDto(data) };

    const filteredNewSearchParams: Params = [];
    for (const [name, value] of Object.entries(newSearchParams)) {
      if (value !== '' && value !== 0) {
        filteredNewSearchParams[name] = value;
      }
    }

    this.router.navigate([], {
      queryParams: filteredNewSearchParams,
    });

    return new HttpParams({
      fromObject: filteredNewSearchParams,
    });
  }

  /** Gets search params from browser address string. */
  public getAnimeListSearchParams(): AnimeListSearchParams {
    const { queryParams } = this.activatedRoute.snapshot;

    return AnimeListSearchParamsMapper.fromDto(queryParams);
  }
}
