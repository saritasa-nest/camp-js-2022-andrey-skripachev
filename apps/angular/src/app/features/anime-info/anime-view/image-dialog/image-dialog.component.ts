import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Data for image in popup. */
interface ImageDialogData {

  /** Anime source. */
  readonly src: string;

  /** Anime alt. */
  readonly alt: string;
}

/** Anime image dialog. */
@Component({
  selector: 'camp-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDialogComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public readonly dialogData: ImageDialogData,
  ) {}
}
