import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AnimeListSearchParamsMapper } from '@js-camp/core/mappers/animeListSearchParams.mapper';
import { AnimeListSearchParams } from '@js-camp/core/models/animeListSearchParams';
import { map, Observable } from 'rxjs';

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
      if (Boolean(value)) {
        filteredSearchParams[name] = value;
      }
    }

    this.router.navigate([], {
      queryParams: filteredSearchParams,
    })

    return new HttpParams({
      fromObject: searchParams,
    });
  }

  public getAnimeListSearchParams(): Observable<AnimeListSearchParams> {
    return this.activatedRoute.queryParams.pipe(
      map(({limit, offset, type__in, ordering, search}: Params) => {
        console.log(limit, offset, type__in, ordering, search)
        return {
          limit: Number(limit || 10),
          offset: Number(offset || 0),
          type__in: String(type__in || ''),
          ordering: String(ordering || ''),
          search: String(search || ''),
        };
      }),
      map(AnimeListSearchParamsMapper.fromDto)
    )
  }
}
