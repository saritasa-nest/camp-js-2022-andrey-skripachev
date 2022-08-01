import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from '../core/interceptors/api.interceptor';

import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeStatusPipe } from './pipes/anime-status.pipe';
import { EmptyStringPipe } from './pipes/empty-string.pipe';

/** Shared module. */
@NgModule({
  declarations: [
    AnimeTypePipe,
    AnimeStatusPipe,
    EmptyStringPipe,
  ],
  exports: [
    AnimeTypePipe,
    AnimeStatusPipe,
    EmptyStringPipe,
  ],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule { }
