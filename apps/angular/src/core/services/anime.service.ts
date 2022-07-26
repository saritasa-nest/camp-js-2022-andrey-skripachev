import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Pagination } from '../models/pagination';
import { Anime } from '../models/anime';

import { PaginationDto } from './mappers/dtos/pagination.dto';
import { PaginationMapper } from './mappers/pagination.mapper';
import { AnimeDto } from './mappers/dtos/anime.dto';
import { AnimeMapper } from './mappers/anime.mapper';
import { ApiService } from './api.service';

/** Fetch anime. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private apiService: ApiService,
  ) {}

  /** Gets 1st page. */
  public getAnimeList(searchParamsString: string): Observable<Pagination<Anime>> {
    const httpParams = new HttpParams({
      fromString: searchParamsString,
    });
    return this.apiService.getData<PaginationDto<AnimeDto>>('anime/anime/', httpParams).pipe(
      map(dto => PaginationMapper.fromDto<AnimeDto, Anime>(dto, AnimeMapper.fromDto)),
    );
  }
}
