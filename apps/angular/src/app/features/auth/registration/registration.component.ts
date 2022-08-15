import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { UserService } from '../../../../core/services/user.service';

const passwordsIsNowEqualsError = {
  confirmPassword: 'Passwords is not equals',
};

/** Registration form component. */
@Component({
  selector: 'camp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {

  /** Name of the registration error. */
  public readonly registrationError = 'reg-error';

  /** Registration form group. */
  public readonly registrationForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.registrationForm = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  /** Registers user. */
  public handleSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const registrationData = this.registrationForm.value;

    const { password, confirmPassword } = registrationData;

    if (password !== confirmPassword) {
      this.registrationForm.setErrors(passwordsIsNowEqualsError);

      this.cdr.markForCheck();
      return;
    }

    this.userService.register(registrationData).pipe(
      tap(errorMessage => {
        if (errorMessage === null) {
          return;
        }

        this.registrationForm.setErrors({
          [errorMessage[0]]: errorMessage[1],
        });

        this.cdr.markForCheck();
      }),
    )
      .subscribe();

  }
}
