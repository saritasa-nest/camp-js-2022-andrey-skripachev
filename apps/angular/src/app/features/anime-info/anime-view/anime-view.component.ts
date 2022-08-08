import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime information view component. */
@Component({
  selector: 'camp-anime-view',
  templateUrl: './anime-view.component.html',
  styleUrls: ['./anime-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeViewComponent implements OnDestroy {

  private readonly animeDetailsSubscription = new Subscription();

  /** Details about anime. */
  public readonly animeDetails$: Observable<AnimeDetails>;

  /** Safe url of the YouTube trailer. */
  public readonly animeTrailer$ = new BehaviorSubject<SafeResourceUrl | null>(null);

  public constructor(
    animeService: AnimeService,
    router: ActivatedRoute,
    sanitized: DomSanitizer,
  ) {
    const { id } = router.snapshot.params;
    this.animeDetails$ = animeService.getAnimeById(Number(id));
    this.animeDetailsSubscription.add(
      this.animeDetails$.subscribe(anime => {
        this.animeTrailer$.next(sanitized.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${anime.trailerYoutubeId}`));
      }),
    );

  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.animeDetailsSubscription.unsubscribe();
  }
}
