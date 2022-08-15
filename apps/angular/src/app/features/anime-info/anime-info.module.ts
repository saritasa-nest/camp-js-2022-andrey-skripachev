import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { SharedModule } from '../../../shared/shared.module';

import { AnimeInfoRoutingModule } from './anime-info-routing.module';
import { AnimeInfoComponent } from './anime-info.component';
import { AnimeViewComponent } from './anime-view/anime-view.component';
import { ImageDialogComponent } from './anime-view/image-dialog/image-dialog.component';
import { ConfirmDeletingAnimeComponent } from './anime-view/confirm-deleting-anime/confirm-deleting-anime.component';
import { AnimeEditComponent } from './anime-edit/anime-edit.component';
import { AnimeEditFormComponent } from './anime-edit-form/anime-edit-form.component';
import { AnimeCreateComponent } from './anime-create/anime-create.component';

/** Anime information module. */
@NgModule({
  declarations: [
    AnimeInfoComponent,
    AnimeViewComponent,
    ImageDialogComponent,
    ConfirmDeletingAnimeComponent,
    AnimeEditComponent,
    AnimeEditFormComponent,
    AnimeCreateComponent,
  ],
  imports: [
    CommonModule,
    AnimeInfoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgxMatFileInputModule,
  ],
})
export class AnimeInfoModule {}
