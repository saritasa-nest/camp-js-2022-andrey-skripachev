import { Component, TrackByFunction } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { map, Observable } from 'rxjs';

import { AnimeService } from '../../../core/services/anime.service';

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent {

  /** Current anime list. */
  public animeList$ = new Observable<readonly Anime[]>();

  /** Table column names. */
  public readonly tableColumns = ['image', 'title', 'aired start', 'status', 'type'];

  public constructor(
    private readonly animeService: AnimeService,
  ) {
    this.animeList$ = this.animeService.getAnime().pipe(
      map(result => result.results),
    );
  }

  /**
   * Tracks anime by id.
   * @param _  Anime index in list.
   * @param anime Current anime.
   */
  public trackById: TrackByFunction<Anime> = function(_, anime) {
    return anime.id;
  };
}
