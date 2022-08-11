import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found.component';

/** Module for unknown pages. */
@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule],
})
export class PageNotFoundModule {}
