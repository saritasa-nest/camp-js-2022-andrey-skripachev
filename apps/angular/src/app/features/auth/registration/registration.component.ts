import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../../../core/services/user.service';

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
      firstName: ['1', [Validators.required]],
      lastName: ['1', [Validators.required]],
      email: ['1', [Validators.required, Validators.email]],
      password: ['1', [Validators.required]],
      confirmPassword: ['1', [Validators.required]],
    });
  }

  /** Registers user. */
  public handleSubmit(): void {
    if (this.registrationForm.invalid) {
      return void 0;
    }
  }
}
