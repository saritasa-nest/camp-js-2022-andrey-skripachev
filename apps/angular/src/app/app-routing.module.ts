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
    path: 'details',
    loadChildren: () =>
      import('./features/anime-info/anime-info.module').then(m => m.AnimeInfoModule),
  }
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

  /** Using HashLocationStrategy for GitHub pages. */
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule { }
