import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';

import { ApiService } from './api.service';

const DEFAULT_SEARCH_OPTIONS = new HttpParams({
  fromString: 'limit=10&offset=0&ordering=id',
});

/** Fetch anime. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private readonly apiService: ApiService,
  ) {}

  /** Gets 1st page. */
  public getAnime(): Observable<Pagination<Anime>> {
    return this.apiService.getData<PaginationDto<AnimeDto>>('anime/anime/', DEFAULT_SEARCH_OPTIONS).pipe(
      map(dto => PaginationMapper.fromDto<AnimeDto, Anime>(dto, AnimeMapper.fromDto)),
    );
  }
}
