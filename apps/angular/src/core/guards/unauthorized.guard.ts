import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UserService } from '../services/user.service';

/** Guard prevents access for unauthorized users. */
@Injectable({
  providedIn: 'root',
})
export class UnauthorizedGuard implements CanActivate {

  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** @inheritdoc */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.userService.isAuthorized$.pipe(
      map(isAuthorized => isAuthorized ? true : this.router.parseUrl('/')),
    );
  }
}
