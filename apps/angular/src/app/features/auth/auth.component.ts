import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Auth page. */
@Component({
  selector: 'camp-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
