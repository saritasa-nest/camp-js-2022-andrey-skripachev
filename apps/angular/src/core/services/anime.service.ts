import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';

import { environment } from '../../environments/environment';

const DEFAULT_SEARCH_OPTIONS = new HttpParams({
  fromObject: {
    limit: 10,
    offset: 0,
    ordering: 'id',
  },
});

/** Fetch anime. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private readonly httpClient: HttpClient,
  ) {}

  /** Gets anime list. */
  public getAnimeList(): Observable<readonly Anime[]> {
    const url = new URL('anime/anime/', environment.apiUrl);
    return this.httpClient.get<PaginationDto<AnimeDto>>(url.toString(), {
      params: DEFAULT_SEARCH_OPTIONS,
    }).pipe(
      map(dto => PaginationMapper.fromDto(dto, AnimeMapper.fromDto).results),
    );
  }
}
