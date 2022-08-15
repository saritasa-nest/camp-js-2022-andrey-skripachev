import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { ErrorMessage } from '@js-camp/core/models/error-response';
import { Observable, Subscription, tap } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime edit component. */
@Component({
  selector: 'camp-anime-edit',
  templateUrl: './anime-edit.component.html',
  styleUrls: ['./anime-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditComponent {

  private readonly animeId: number;

  /** Editable anime. */
  public readonly currentAnime$: Observable<AnimeDetails>;

  private readonly animeSubscription = new Subscription();

  public constructor(
    private readonly router: Router,
    private readonly animeService: AnimeService,
    activatedRoute: ActivatedRoute,
  ) {
    const { id } = activatedRoute.snapshot.params;

    this.currentAnime$ = animeService.getAnimeById(Number(id));

    this.animeSubscription.add(
      this.currentAnime$.subscribe(),
    );

    this.animeId = Number(id);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Changes anime and sends error response in edit form.
   * @param animeData Modified anime data.
   */
  public handleSubmit(animeData: AnimeDetails): Observable<ErrorMessage | null> {
    const errorResponseMessage$ = this.animeService.changeAnimeById(this.animeId, animeData).pipe(
      tap(value => {
        if (value === null) {
          this.goToView();
        }
      }),
    );

    return errorResponseMessage$;
  }

  /**
   * Returns to view detailed information.
   */
  public goToView(): void {
    this.router.navigate(['details', this.animeId, 'view']);
  }
}
