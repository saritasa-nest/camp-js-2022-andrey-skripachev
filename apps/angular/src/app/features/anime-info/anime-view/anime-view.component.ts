import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { Observable, Subscription, tap } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';
import { ConfirmDeletingAnimeComponent } from './confirm-deleting-anime/confirm-deleting-anime.component';

import { ImageDialogComponent } from './image-dialog/image-dialog.component';

/** Anime information view component. */
@Component({
  selector: 'camp-anime-view',
  templateUrl: './anime-view.component.html',
  styleUrls: ['./anime-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeViewComponent implements OnDestroy {

  private readonly animeID: number;

  private readonly animeDetailsSubscription = new Subscription();

  /** Details about anime. */
  public readonly animeDetails$: Observable<AnimeDetails>;

  public constructor(
    private readonly dialog: MatDialog,
    private readonly animeService: AnimeService,
    activatedRoute: ActivatedRoute,
  ) {
    const { id } = activatedRoute.snapshot.params;
    this.animeDetails$ = this.animeService.getAnimeById(Number(id));
    this.animeDetailsSubscription.add(
      this.animeDetails$.subscribe(),
    );
    this.animeID = Number(id);

    this.deleteCurrentAnime = this.deleteCurrentAnime.bind(this);
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

  public handleDeleteButtonClick(): void {
    this.dialog.open(ConfirmDeletingAnimeComponent, {
      data: { onConfirm: this.deleteCurrentAnime }
    })
  }

  private deleteCurrentAnime(): void {
    this.animeDetailsSubscription.add(
      this.animeService.deleteAnime(this.animeID).subscribe()
    )
  }
}
