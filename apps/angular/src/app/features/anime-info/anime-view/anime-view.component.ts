import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { AnimeService } from 'apps/angular/src/core/services/anime.service';
import { Observable, Subscription, tap } from 'rxjs';

/** Anime information view component. */
@Component({
  selector: 'camp-anime-view',
  templateUrl: './anime-view.component.html',
  styleUrls: ['./anime-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeViewComponent implements OnDestroy {

  private readonly animeDetailsSubscription = new Subscription();

  public readonly animeDetails$: Observable<AnimeDetails>;

  public constructor(
    animeService: AnimeService,
  ) {
    const currentAnimeId = 8337;
    this.animeDetails$ = animeService.getAnimeById(currentAnimeId);
    this.animeDetailsSubscription.add(
      this.animeDetails$.subscribe(),
    )
  }

  ngOnDestroy(): void {
    this.animeDetailsSubscription.unsubscribe();
  }

}
