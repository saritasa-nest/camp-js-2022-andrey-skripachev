import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'anime', pathMatch: 'full' },
  {
    path: 'anime',
    loadChildren: () =>
      import('./features/anime/anime.module').then(m => m.AnimeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./features/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
  },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

  /** Using HashLocationStrategy for GitHub pages. */
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule { }
