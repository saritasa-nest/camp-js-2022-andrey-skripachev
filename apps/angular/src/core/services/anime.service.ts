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

const DEFAULT_SEARCH_OPTIONS = new HttpParams({
  fromString: 'limit=10&offset=0&ordering=id',
});

/** Fetch anime. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private apiService: ApiService,
  ) {}

  /** Gets 1st page. */
  public getAnime(): Observable<Pagination<Anime>> {
    return this.apiService.getData<PaginationDto<AnimeDto>>('anime/anime/', DEFAULT_SEARCH_OPTIONS).pipe(
      map(dto => PaginationMapper.fromDto<AnimeDto, Anime>(dto, AnimeMapper.fromDto)),
    );
  }
}
