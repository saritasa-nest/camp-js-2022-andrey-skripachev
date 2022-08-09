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
import { ImageDialogComponent } from './anime-view/image-dialog/image-dialog.component';
import { ConfirmDeletingAnimeComponent } from './anime-view/confirm-deleting-anime/confirm-deleting-anime.component';
import { MatButtonModule } from '@angular/material/button';

/** Anime information module. */
@NgModule({
  declarations: [
    AnimeInfoComponent,
    AnimeViewComponent,
    ImageDialogComponent,
    ConfirmDeletingAnimeComponent,
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
    MatButtonModule
  ],
})
export class AnimeInfoModule {}
