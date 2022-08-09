import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedGuard } from 'apps/angular/src/core/guards/unauthorized.guard';

import { AnimeInfoComponent } from './anime-info.component';
import { AnimeViewComponent } from './anime-view/anime-view.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeInfoComponent,
    canActivate: [UnauthorizedGuard],
    children: [
      {
        path: ':id',
        redirectTo: ':id/view',
        pathMatch: 'full',
      },
      {
        path: ':id/view',
        component: AnimeViewComponent,
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
