import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './anime-table/anime-table.component';

import { AnimeComponent } from './anime.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeComponent,
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'view',
        component: AnimeTableComponent,
      },
    ],
  },
];

/** Anime routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule { }
