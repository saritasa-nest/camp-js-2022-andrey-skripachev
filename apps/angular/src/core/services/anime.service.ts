import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';

import { environment } from '../../environments/environment';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private readonly httpClient: HttpClient,
  ) {}

  /**
   * Gets the anime and returns the converted result.
   * @param searchParams Query search parameters to get a list of anime.
   */
  public getAnimeList(searchParams: HttpParams): Observable<Pagination<Anime>> {
    const url = new URL('anime/anime/', environment.apiUrl);

    return this.httpClient.get<PaginationDto<AnimeDto>>(url.toString(), {
      params: searchParams,
    }).pipe(
      map(dto => PaginationMapper.fromDto<AnimeDto, Anime>(dto, AnimeMapper.fromDto)),
    );
  }
}
