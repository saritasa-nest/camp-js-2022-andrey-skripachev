import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeComponent } from './features/anime/anime.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: 'catalog', component: AnimeComponent },
  { path: '**', component: PageNotFoundComponent },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

  /** Using HashLocationStrategy for GitHub pages. */
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule { }
