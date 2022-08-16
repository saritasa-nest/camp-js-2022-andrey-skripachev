import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { ApiAuthorizationInterceptor } from '../core/interceptors/api-authorization.interceptor';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { RefreshInterceptor } from '../core/interceptors/refresh.interceptor';

import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeStatusPipe } from './pipes/anime-status.pipe';
import { EmptyValuePipe } from './pipes/empty-value.pipe';
import { SortingPipe } from './pipes/sorting.pipe';
import { HeaderComponent } from './components/header/header.component';

/** Shared module. */
@NgModule({
  declarations: [
    AnimeTypePipe,
    AnimeStatusPipe,
    EmptyValuePipe,
    SortingPipe,
    HeaderComponent,
  ],
  exports: [AnimeTypePipe, AnimeStatusPipe, EmptyValuePipe, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    SortingPipe,
  ],
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
