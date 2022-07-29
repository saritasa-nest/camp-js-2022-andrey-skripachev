import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { Observable } from 'rxjs';

import { AnimeService } from '../../../core/services/anime.service';

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {

  /** Current anime list. */
  public readonly animeList$: Observable<readonly Anime[]>;

  /** Table column names. */
  public readonly tableColumns = ['image', 'title', 'aired start', 'status', 'type'];

  public constructor(
    animeService: AnimeService,
  ) {
    this.animeList$ = animeService.getAnimeList();
  }

  /**
   * Tracks anime by id.
   * @param _  Anime index in list.
   * @param anime Current anime.
   */
  public trackById(_: number, anime: Anime): number {
    return anime.id;
  }
}
