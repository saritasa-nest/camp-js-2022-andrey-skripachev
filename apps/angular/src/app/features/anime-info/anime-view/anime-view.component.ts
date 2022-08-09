import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { Observable, Subscription } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

import { ImageDialogComponent } from './image-dialog/image-dialog.component';

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

  public constructor(
    private readonly dialog: MatDialog,
    animeService: AnimeService,
    router: ActivatedRoute,
  ) {
    const { id } = router.snapshot.params;
    this.animeDetails$ = animeService.getAnimeById(Number(id));
    this.animeDetailsSubscription.add(
      this.animeDetails$.subscribe(),
    );
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.animeDetailsSubscription.unsubscribe();
  }

  /**
   * Shows popup with image.
   * @param src Image src.
   * @param alt Image alt.
   */
  public showFullSizeImage(src: string, alt: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { src, alt },
    });
  }
}
