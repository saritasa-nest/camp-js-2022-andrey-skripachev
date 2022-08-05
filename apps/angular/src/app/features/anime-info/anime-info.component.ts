import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Anime information component. */
@Component({
  selector: 'camp-anime-info',
  templateUrl: './anime-info.component.html',
  styleUrls: ['./anime-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeInfoComponent {
}
