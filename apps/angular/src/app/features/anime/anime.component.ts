import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { UserService } from 'apps/angular/src/core/services/user.service';
import { BehaviorSubject, Subscription } from 'rxjs';

/** Anime page. */
@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnDestroy {

  public isUserAuthorized: boolean;

  private sub = new Subscription();

  public constructor(
    private readonly userService: UserService,
  ) {
    this.sub.add(userService.isAuthorized$.subscribe(
      isAuth => {
        this.isUserAuthorized = isAuth;
      }
    ))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleLogoutClick(): void {
    this.userService.logout()
  }
}
