import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, mapTo, Observable, of, throwError } from 'rxjs';

import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import {
  AnimeDetails,
} from '@js-camp/core/models/anime-details';
import { AnimeDetailsDto } from '@js-camp/core/dtos/anime-details.dto';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/anime-details.mapper';
import {
  ErrorMessage,
  ValidationErrorResponse,
} from '@js-camp/core/models/validation-error-response';

import { ValidationErrorResponseMapper } from '@js-camp/core/mappers/validation-error-response.mapper';
import { Genre } from '@js-camp/core/models/genre';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { Studio } from '@js-camp/core/models/studio';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';

import { AppConfigService } from './app-config.service';

const SNACKBAR_DURATION = 2;

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private readonly animeUrl: URL;

  private readonly genresUrl: URL;

  private readonly studiosUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {
    this.animeUrl = new URL('anime/anime/', appConfig.apiUrl);
    this.genresUrl = new URL('anime/genres/', appConfig.apiUrl);
    this.studiosUrl = new URL('anime/studios/', appConfig.apiUrl);
  }

  private getErrorMessage(
    errorResponse: ValidationErrorResponse,
  ): ErrorMessage {
    const errorResponseModel = ValidationErrorResponseMapper.fromDto(errorResponse);
    if (errorResponseModel.data) {
      for (const [field, message] of Object.entries(errorResponseModel.data)) {
        if (message) {
          return [field, message.join(' ')];
        }
      }
    }

    return ['detail', errorResponseModel.detail];
  }

  private showSnackBarMessage(message: string): void {
    this.snackBar.open(message, '', {
      duration: SNACKBAR_DURATION * 1000,
      announcementMessage: 'AMOGUS',
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
    return this.httpClient.get<PaginationDto<AnimeDto>>(this.animeUrl.toString(), {
      params: searchParams,
    })
      .pipe(map(dto => PaginationMapper.fromDto(dto, AnimeMapper.fromDto)));
  }

  /**
   * Gets anime by id.
   * @param id Anime id.
   */
  public getAnimeById(id: number): Observable<AnimeDetails> {
    return this.httpClient
      .get<AnimeDetailsDto>(this.createAnimeUrlById(id))
      .pipe(
        map(AnimeDetailsMapper.fromDto),
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
      this.showSnackBarMessage('Deleting successful!');
    });

    return this.httpClient
      .delete(this.createAnimeUrlById(id))
      .pipe(mapTo(void 0));
  }

  /**
   * Modifies anime data.
   * @param id Anime id.
   * @param newAnimeData Anime modified data.
   */
  public changeAnimeById(
    id: number,
    newAnimeData: AnimeDetails,
  ): Observable<null | ErrorMessage> {
    return this.httpClient.put(
      this.createAnimeUrlById(id),
      {
        ...AnimeDetailsMapper.toDto(newAnimeData),
      },
    ).pipe(
      mapTo(null),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          return of(this.getErrorMessage(error.error));
        }

        return throwError(new Error(String(error)));
      }),
    );
  }

  /**
   * Receives genre list searching by name.
   * @param searchingName Searching name.
   * @param maximumReceivingCount Maximum number of received genres.
   */
  public getGenresByName(
    searchingName: string,
    maximumReceivingCount: number,
  ): Observable<readonly Genre[]> {
    const searchParams = {
      search: searchingName,
      limit: maximumReceivingCount,
    };
    return this.httpClient.get<PaginationDto<GenreDto>>(this.genresUrl.toString(), {
      params: searchParams,
    })
      .pipe(
        map(dto => PaginationMapper.fromDto(dto, GenreMapper.fromDto).results),
      );
  }

  /**
   * Receives studio list searching by name.
   * @param searchingName Searching name.
   * @param maximumReceivingCount Maximum number of received studios.
   */
  public getStudiosByName(
    searchingName: string,
    maximumReceivingCount: number,
  ): Observable<readonly Studio[]> {
    const searchParams = {
      search: searchingName,
      limit: maximumReceivingCount,
    };
    return this.httpClient.get<PaginationDto<StudioDto>>(this.studiosUrl.toString(), {
      params: searchParams,
    })
      .pipe(
        map(
          dto => PaginationMapper.fromDto(dto, StudioMapper.fromDto).results,
        ),
      );
  }

  /**
   * Creates new studio.
   * @param studioName Studio name.
   */
  public createStudio(studioName: string): Observable<Studio> {
    return this.httpClient.post<StudioDto>(this.studiosUrl.toString(), {
      name: studioName,
    })
      .pipe(map(StudioMapper.fromDto));
  }

  /**
   * Created new genre.
   * @param genreName Genre name.
   */
  public createGenre(genreName: string): Observable<Genre> {
    return this.httpClient.post<GenreDto>(this.genresUrl.toString(), {
      type: 'GENRES',
      name: genreName,
    })
      .pipe(map(GenreMapper.fromDto));
  }
}
