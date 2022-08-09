import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ImageDialogData {
  readonly src: string;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly dialogData: ImageDialogData,
  ){}
}
