import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeComponent } from './features/anime/anime.component';
import { AuthComponent } from './features/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'anime', pathMatch: 'full' },
  { path: 'anime', component: AnimeComponent },
  { path: 'auth', component: AuthComponent },
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
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule { }
