import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Component for unknown pages. */
@Component({
  selector: 'camp-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
