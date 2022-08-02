import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';

import { AnimeListSearchParams } from '../models/animeListSearchParams';

import { AppConfigService } from './app-config.service';
import { AnimeListSearchParamsMapper } from './mappers/animeListSearchParams.mapper';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeListUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
  ) {
    this.animeListUrl = new URL('anime/anime/', appConfig.apiUrl);
  }

  /**
   * Gets anime list.
   * @param searchParams Params for searching anime.
   */
  public getAnimeList(searchParams: AnimeListSearchParams): Observable<readonly Anime[]> {
    const searchParamsDto = AnimeListSearchParamsMapper.toDto(searchParams);

    return this.httpClient.get<PaginationDto<AnimeDto>>(
      this.animeListUrl.toString(),
      {
        params: new HttpParams({
          fromObject: { ...searchParamsDto },
        }),
      },
    ).pipe(map(dto => PaginationMapper.fromDto(dto, AnimeMapper.fromDto).results));
  }
}
