import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';

import { AnimeService } from '../../../core/services/anime.service';
import { Anime } from '../../../core/models/anime';

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit, OnDestroy {

  /** Current anime list. */
  public anime$: Observable<readonly Anime[]> | null = null;

  private subscription: Subscription | null = null;

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

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private getAnime(): void {
    this.anime$ = this.animeService.getAnime().pipe(
      map(result => result.results),
    );
    this.subscription = this.anime$.subscribe();
  }
}
