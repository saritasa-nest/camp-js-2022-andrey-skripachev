import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './anime-table/anime-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'anime-list', pathMatch: 'full' },
  { path: 'anime-list', component: AnimeTableComponent },
];

/** Anime list routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule { }
