import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/** Dialog data. */
interface DialogData {

  /** Function triggered on confirmation. */
  readonly onConfirm: () => void;
}

/** Dialog window for confirm deleting current anime. */
@Component({
  selector: 'camp-confirm-deleting-anime',
  templateUrl: './confirm-deleting-anime.component.html',
  styleUrls: ['./confirm-deleting-anime.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeletingAnimeComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly dialogData: DialogData,
    private readonly dialogRef: MatDialogRef<ConfirmDeletingAnimeComponent>,
  ) {}

  public handleChoose(isConfirm: boolean): void {
    if (isConfirm) {
      this.dialogData.onConfirm();
    }

    this.dialogRef.close();
  }
}
