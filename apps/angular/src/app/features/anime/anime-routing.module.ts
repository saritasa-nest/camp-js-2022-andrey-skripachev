import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './anime-table/anime-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'table-view', pathMatch: 'full' },
  { path: 'table-view', component: AnimeTableComponent },
];

/**  */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule { }
