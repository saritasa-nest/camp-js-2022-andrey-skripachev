import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { ErrorMessage } from '@js-camp/core/models/validation-error-response';
import { AnimeService } from 'apps/angular/src/core/services/anime.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'camp-anime-edit',
  templateUrl: './anime-edit.component.html',
  styleUrls: ['./anime-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditComponent {

  private readonly animeId: number;

  public readonly currentAnime$: Observable<AnimeDetails>;

  private readonly animeSubscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly animeService: AnimeService,
    activatedRoute: ActivatedRoute,
  ) {
    const { id } = activatedRoute.snapshot.params;

    this.currentAnime$ = animeService.getAnimeById(Number(id));

    this.animeSubscription.add(
      this.currentAnime$.subscribe(),
    )

    this.animeId = Number(id);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit(animeData: AnimeDetails): Observable<ErrorMessage | null> {
    return this.animeService.changeAnimeById(this.animeId, animeData);
  }

  public goToView(): void {
    this.router.navigate(['details', this.animeId, 'view']);
  }
}
