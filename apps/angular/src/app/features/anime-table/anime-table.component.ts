import { Component, OnInit } from '@angular/core';

import { AnimeService } from '../../../core/services/anime.service';
import { Anime } from '../../../core/models/anime';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit {
  public anime$: Observable<readonly Anime[]> | null = null;

  constructor(
    private animeService: AnimeService,
  ) {}

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
