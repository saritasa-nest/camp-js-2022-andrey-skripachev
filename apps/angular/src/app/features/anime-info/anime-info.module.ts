import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '../../../shared/shared.module';

import { AnimeInfoRoutingModule } from './anime-info-routing.module';
import { AnimeInfoComponent } from './anime-info.component';
import { AnimeViewComponent } from './anime-view/anime-view.component';

/** Anime information module. */
@NgModule({
  declarations: [
    AnimeInfoComponent,
    AnimeViewComponent,
  ],
  imports: [
    CommonModule,
    AnimeInfoRoutingModule,
    SharedModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class AnimeInfoModule {}
