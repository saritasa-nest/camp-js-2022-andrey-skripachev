import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { AnimeDetailsDto } from '@js-camp/core/dtos/anime-details.dto';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/anime-details.mapper';

import { AnimeListSearchParams } from '../models/anime-list-search-params';

import { AppConfigService } from './app-config.service';
import { SearchParamsService } from './search-params.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly searchParamsService: SearchParamsService,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) {
    this.animeUrl = new URL('anime/anime/', appConfig.apiUrl);
  }

  /**
   * Gets anime list.
   * @param searchParams Params for searching anime.
   */
  public getAnimeList(searchParams: AnimeListSearchParams): Observable<Pagination<Anime>> {

    return this.httpClient.get<PaginationDto<AnimeDto>>(
      this.animeUrl.toString(),
      {
        params: this.searchParamsService.changeSearchParams(searchParams),
      },
    ).pipe(map(dto => PaginationMapper.fromDto(dto, AnimeMapper.fromDto)));
  }

  /**
   * Gets anime by id.
   * @param id Anime id.
   */
  public getAnimeById(id: number): Observable<AnimeDetails> {
    return this.httpClient.get<AnimeDetailsDto>(
      `${this.animeUrl.toString()}${id}/`,
    ).pipe(
      map(dto => AnimeDetailsMapper.fromDto(dto)),
      catchError(() => {
        this.router.navigate(['/']);
        return throwError(new Error('Anime doesn\'t exists'));
      }),
    );
  }
}
