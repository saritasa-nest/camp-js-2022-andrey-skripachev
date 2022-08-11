import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiAuthorizationInterceptor } from '../core/interceptors/api-authorization.interceptor';

import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeStatusPipe } from './pipes/anime-status.pipe';
import { EmptyValuePipe } from './pipes/empty-value.pipe';
import { SortingPipe } from './pipes/sorting.pipe';

/** Shared module. */
@NgModule({
  declarations: [
    AnimeTypePipe,
    AnimeStatusPipe,
    EmptyValuePipe,
    SortingPipe,
  ],
  exports: [
    AnimeTypePipe,
    AnimeStatusPipe,
    EmptyValuePipe,
    SortingPipe,
  ],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiAuthorizationInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule { }
