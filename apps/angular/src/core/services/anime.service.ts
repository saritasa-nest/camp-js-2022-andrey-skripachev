import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Anime } from '@js-camp/core/models/anime';

import { map, Observable } from 'rxjs';

import { Pagination } from '../models/pagination';

import { PaginationDto } from './mappers/dtos/pagination.dto';
import { PaginationMapper } from './mappers/pagination.mapper';
import { AnimeDto } from './mappers/dtos/anime.dto';
import { AnimeMapper } from './mappers/anime.mapper';

const apiKey = 'a842f444-64aa-457f-a915-500956ef78fb';

const options = {
  'Api-Key': apiKey,
  'headers': new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

/** Fetch anime. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  public constructor(
    private http: HttpClient,
  ) {}

  /** Gets 1st page. */
  public getAnime(): Observable<Pagination<Anime>> {
    const url = 'https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?limit=10&offset=0&ordering=id';
    return this.http.get<PaginationDto<Anime>>(url, options)
      .pipe(
        map(dto => PaginationMapper.fromDto<AnimeDto, Anime>(dto, AnimeMapper.fromDto)),
      );
  }
}
