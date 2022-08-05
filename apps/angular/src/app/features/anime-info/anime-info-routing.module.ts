import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeEditComponent } from './anime-edit/anime-edit.component';
import { AnimeInfoComponent } from './anime-info.component';
import { AnimeViewComponent } from './anime-view/anime-view.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeInfoComponent,
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'view',
        component: AnimeViewComponent,
      },
      {
        path: 'edit',
        component: AnimeEditComponent,
      },
    ],
  },
];

/** Anime information routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeInfoRoutingModule {}
