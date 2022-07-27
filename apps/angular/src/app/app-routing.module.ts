import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './features/anime/anime-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'anime-table', pathMatch: 'full' },
  { path: '**', component: AnimeTableComponent },
  { path: 'anime-table', component: AnimeTableComponent },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
