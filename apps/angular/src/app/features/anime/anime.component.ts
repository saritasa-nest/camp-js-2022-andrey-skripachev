import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../../../core/services/user.service';

/** Anime page. */
@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent implements OnDestroy {

  /** Is user authorized. */
  public isUserAuthorized: boolean;

  private sub = new Subscription();

  public constructor(
    private readonly userService: UserService,
  ) {
    this.sub.add(userService.isAuthorized$.subscribe(
      isAuth => {
        this.isUserAuthorized = isAuth;
      },
    ));
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /** @inheritdoc */
  public handleLogoutClick(): void {
    this.userService.logout();
  }
}
