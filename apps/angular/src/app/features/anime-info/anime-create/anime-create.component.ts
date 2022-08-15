import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { ErrorMessage } from '@js-camp/core/models/validation-error-response';
import { AnimeStatus } from '@js-camp/core/utils/types/animeStatus';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { map, Observable } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

const unknown = 'UNKNOWN';
const nonSeasonal = 'NON_SEASONAL';

/** Creation anime component. */
@Component({
  selector: 'camp-anime-create',
  templateUrl: './anime-create.component.html',
  styleUrls: ['./anime-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCreateComponent {

  /** Default anime form data. */
  public readonly defaultAnimeData = new AnimeDetails({
    trailerYoutubeId: '',
    synopsis: '',
    isAiring: false,
    studiosIdList: [],
    genresIdList: [],
    studiosData: [],
    genresData: [],
    source: unknown,
    rating: unknown,
    season: nonSeasonal,
    background: unknown,
    aired: {
      start: null,
      end: null,
    },
    id: 0,
    image: '',
    status: AnimeStatus.NotYetAired,
    titleEnglish: '',
    titleJapanese: '',
    type: AnimeType.Movie,
  });

  public constructor(
    private readonly router: Router,
    private readonly animeService: AnimeService,
  ) {
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handles anime edit form submitting.
   * @param animeDetails Anime form value.
   */
  public handleSubmit(animeDetails: AnimeDetails): Observable<null | ErrorMessage> {
    return this.animeService.createAnime(animeDetails).pipe(
      map(response => {
        if (response instanceof AnimeDetails) {
          this.goToView(response.id);
          return null;
        }

        return response;
      }),
    );
  }

  private goToView(id: number): void {
    this.router.navigate(['details', id, 'view']);
  }
}
