import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import { UserService } from '../services/user.service';

/** Guard prevents access for authorized users.  */
@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {

  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** @inheritdoc */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.userService.verifyToken().pipe(
      map(isValid => isValid ? this.router.parseUrl('/') : true),
    );
  }

}
