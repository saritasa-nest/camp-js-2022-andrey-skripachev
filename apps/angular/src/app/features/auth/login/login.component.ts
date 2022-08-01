import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'apps/angular/src/core/services/user.service';
import { tap } from 'rxjs';

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  /** Login form. */
  public readonly loginForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /** Handles form submitting. */
  public handleSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;

    this.userService.login(loginData).pipe(
      tap(console.log)
    ).subscribe();

  }
}
