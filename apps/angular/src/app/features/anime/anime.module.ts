import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../../src/shared/shared.module';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeComponent } from './anime.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeComponent, AnimeTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    AnimeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
  ],
})
export class AnimeModule { }
