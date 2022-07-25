import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeTypePipe } from './pipes/anime-type.pipe';
import { AnimeStatusPipe } from './pipes/anime-status.pipe';

/** Shared module. */
@NgModule({
  declarations: [
    AnimeTypePipe,
    AnimeStatusPipe,
  ],
  exports: [
    AnimeTypePipe,
    AnimeStatusPipe,
  ],
  imports: [CommonModule],
})
export class SharedModule { }
