import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

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
  public setSearchParams(data: AnimeListSearchParams): HttpParams {
    const searchParams = { ...AnimeListSearchParamsMapper.toDto(data) };

    const filteredSearchParams: Params = [];
    for (const [name, value] of Object.entries(searchParams)) {
      if (value !== '' && value !== 0) {
        filteredSearchParams[name] = value;
      }
    }

    this.router.navigate([], {
      queryParams: filteredSearchParams,
      queryParamsHandling: 'preserve',
    });

    return new HttpParams({
      fromObject: searchParams,
    });
  }

  /** Gets search params from browser address string. */
  public getAnimeListSearchParams(): Observable<AnimeListSearchParams> {
    return this.activatedRoute.queryParams.pipe(
      map(({ limit, offset, type__in, ordering, search }: Params) => ({
          limit: Number(limit || 10),
          offset: Number(offset || 0),
          type__in: String(type__in || ''),
          ordering: String(ordering || ''),
          search: String(search || ''),
      })),
      map(AnimeListSearchParamsMapper.fromDto),
    );
  }
}
