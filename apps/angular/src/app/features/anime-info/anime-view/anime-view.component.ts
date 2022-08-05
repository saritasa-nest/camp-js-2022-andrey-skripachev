import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Anime information view component. */
@Component({
  selector: 'camp-anime-view',
  templateUrl: './anime-view.component.html',
  styleUrls: ['./anime-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeViewComponent {}
