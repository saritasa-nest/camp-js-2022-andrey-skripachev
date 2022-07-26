import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AnimeService } from '../../../core/services/anime.service';
import { Anime } from '../../../core/models/anime';

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent {

  /** Current anime list. */
  public readonly animeList$: Observable<readonly Anime[]>;

  /** Table column names. */
  public readonly tableColumns = ['image', 'title', 'aired start', 'status', 'type'];

  public constructor(
    private readonly animeService: AnimeService,
  ) {
    this.animeList$ = this.animeService.getAnime().pipe(
      map(result => result.results),
    );
  }
}
