import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthorizedGuard } from '../../../core/guards/unauthorized.guard';

import { AnimeCreateComponent } from './anime-create/anime-create.component';
import { AnimeEditComponent } from './anime-edit/anime-edit.component';
import { AnimeInfoComponent } from './anime-info.component';
import { AnimeViewComponent } from './anime-view/anime-view.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeInfoComponent,
    canActivate: [UnauthorizedGuard],
    children: [
      {
        path: 'create',
        component: AnimeCreateComponent,
      },
      {
        path: ':id',
        redirectTo: ':id/view',
        pathMatch: 'full',
      },
      {
        path: ':id/view',
        component: AnimeViewComponent,
      },
      {
        path: ':id/edit',
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
