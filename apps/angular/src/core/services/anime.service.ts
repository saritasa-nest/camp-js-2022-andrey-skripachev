import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, mapTo, Observable, of, tap, throwError } from 'rxjs';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeDetails, AnimeDetailsRequest } from '@js-camp/core/models/anime-details';
import { AnimeDetailsDto } from '@js-camp/core/dtos/anime-details.dto';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/anime-details.mapper';
import { ErrorMessage, ValidationErrorResponse } from '@js-camp/core/models/validation-error-response';

import { AppConfigService } from './app-config.service';
import { ValidationErrorResponseMapper } from '@js-camp/core/mappers/validation-error-response.mapper';

const SNACKBAR_DURATION = 2;

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private readonly animeUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.animeUrl = new URL('anime/anime/', appConfig.apiUrl);
  }

  private getErrorMessage(errorResponse: ValidationErrorResponse): ErrorMessage {
    if (errorResponse.data) {
      for (const [field, message] of Object.entries(errorResponse.data)) {
        if (message) {
          return [field, message.join(' ')];
        }
      }
    }

    return ['detail', errorResponse.detail];
  }

  private showSnackBarMessage(message: string): void {
    this.snackBar.open(message, '', {
      duration: SNACKBAR_DURATION * 1000,
      announcementMessage: 'AMOGUS'
    });
  }

  private createAnimeUrlById(id: number): string {
    return `${this.animeUrl.toString()}${id}/`;
  }

  /**
   * Gets anime list.
   * @param searchParams Params for searching anime.
   */
  public getAnimeList(searchParams: HttpParams): Observable<Pagination<Anime>> {
    return this.httpClient.get<PaginationDto<AnimeDto>>(
      this.animeUrl.toString(),
      {
        params: searchParams,
      },
    ).pipe(
      map(dto => PaginationMapper.fromDto(dto, AnimeMapper.fromDto))
    );
  }

  /**
   * Gets anime by id.
   * @param id Anime id.
   */
  public getAnimeById(id: number): Observable<AnimeDetails> {
    return this.httpClient.get<AnimeDetailsDto>(
      this.createAnimeUrlById(id),
    ).pipe(
      map(dto => AnimeDetailsMapper.fromDto(dto)),
      catchError(() => {
        this.router.navigate(['/']);
        return throwError(new Error('Anime doesn\'t exists'));
      }),
    );
  }

  /**
   * Deletes anime by id.
   * @param id Anime id.
   */
  public deleteAnime(id: number): Observable<void> {
    this.router.navigate(['/']).then(() => {
      this.showSnackBarMessage('Deleting successful!')
    })

    return this.httpClient.delete(
      this.createAnimeUrlById(id)
    ).pipe(
      mapTo(void 0));
  }

  public changeAnimeById(id: number, newAnimeData: AnimeDetailsRequest): Observable<null | ErrorMessage> {
    return of(null);
  }
}
