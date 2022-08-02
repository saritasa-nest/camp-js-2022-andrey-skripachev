import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../../core/services/user.service';

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  /** Login error name. */
  public readonly loginError = 'login-error';

  /** Login form. */
  public readonly loginForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder,
    private userService: UserService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /** Handles form submitting. */
  public handleSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;

    this.userService.login(loginData)
      .subscribe({
        // eslint-disable-next-line rxjs/no-implicit-any-catch
        error: ({ error: { detail } }) => {
          this.loginForm.setErrors({
            [this.loginError]: detail,
          });

          this.cdr.markForCheck();
        },
      });

  }
}
