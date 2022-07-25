import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AnimeService } from '../../../core/services/anime.service';
import { Anime } from '../../../core/models/anime';

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit {

  /** Current anime list. */
  public anime$: Observable<readonly Anime[]> | null = null;

  /** Table column names. */
  public tableColumns: string[] = ['image', 'title', 'aired start', 'status', 'type'];

  public constructor(
    private animeService: AnimeService,
  ) {}

  /**
   * Gets a list of anime from the server.
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.getAnime();
  }

  private getAnime(): void {
    this.anime$ = this.animeService.getAnime().pipe(
      map(result => result.results),
    );
    this.anime$.subscribe();
  }
}
