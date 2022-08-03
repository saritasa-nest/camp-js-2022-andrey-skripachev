import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { UserService } from 'apps/angular/src/core/services/user.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'camp-auth-controls',
  templateUrl: './auth-controls.component.html',
  styleUrls: ['./auth-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthControlsComponent implements OnDestroy {

  public readonly isUserAuthorized$ = new BehaviorSubject<boolean>(false);

  private sub = new Subscription();

  public constructor(
    private readonly userService:  UserService,
  ) {
    this.sub.add(this.userService.isAuthorized$.subscribe(isAuthorized => {
      this.isUserAuthorized$.next(isAuthorized);
    }))
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public handleLogout(): void {
    this.userService.logout();
  }
}
