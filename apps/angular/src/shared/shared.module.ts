import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiAuthorizationInterceptor } from '../core/interceptors/api-authorization.interceptor';

import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeStatusPipe } from './pipes/anime-status.pipe';
import { EmptyValuePipe } from './pipes/empty-value.pipe';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { AuthControlsComponent } from './components/auth-controls/auth-controls.component';

/** Shared module. */
@NgModule({
  declarations: [
    AnimeTypePipe,
    AnimeStatusPipe,
    EmptyValuePipe,
    AuthControlsComponent,
  ],
  exports: [AnimeTypePipe, AnimeStatusPipe, EmptyValuePipe, AuthControlsComponent],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiAuthorizationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
