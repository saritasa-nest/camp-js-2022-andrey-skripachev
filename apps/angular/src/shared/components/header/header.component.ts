import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { UserService } from '../../../../src/core/services/user.service';

/** Page header component. */
@Component({
  selector: 'camp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {

  /** Is user authorized. */
  public isAuthorized$ = new BehaviorSubject<boolean>(false);

  private subscription = new Subscription();

  public constructor(
    private readonly userService: UserService,
  ) {
    this.subscription.add(this.userService.isAuthorized$.subscribe(
      isAuth => {
        this.isAuthorized$.next(isAuth);
      },
    ));
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /** Handles click on logout button. */
  public handleLogoutClick(): void {
    this.subscription.add(this.userService.logout().subscribe());
  }
}
