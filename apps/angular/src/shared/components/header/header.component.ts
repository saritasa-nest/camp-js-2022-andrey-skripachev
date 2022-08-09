import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../../../../src/core/services/user.service';

/** Page header component. */
@Component({
  selector: 'camp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {

  /** Should redirects user to login page on logout. */
  @Input() public shouldRedirectAfterLogout = false;

  private subscription = new Subscription();

  public constructor(
    public readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /** Handles click on logout button. */
  public handleLogoutClick(): void {
    this.subscription.add(this.userService.logout().subscribe());
    if (this.shouldRedirectAfterLogout) {
      this.router.navigate(['/auth']);
    }
  }
}
