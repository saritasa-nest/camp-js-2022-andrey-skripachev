import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Anime information edit component. */
@Component({
  selector: 'camp-anime-edit',
  templateUrl: './anime-edit.component.html',
  styleUrls: ['./anime-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditComponent {}
