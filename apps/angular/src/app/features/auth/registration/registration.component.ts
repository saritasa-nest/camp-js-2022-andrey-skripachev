import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from 'apps/angular/src/core/services/user.service';

type field = (string | ((control: AbstractControl<any, any>) => ValidationErrors | null)[])[]

type field2 = AbstractControl<any, any>

interface registrationControls {
  readonly firstName: field;
  readonly lastName: field;
  readonly email: field;
  readonly password: field;
  readonly confirmPassword: field;
}

interface reg {
  readonly firstName:field2;
  readonly lastName: field2;
  readonly email: field2;
  readonly password: field2;
  readonly confirmPassword: field2;
}

@Component({
  selector: 'camp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {

  public readonly registrationError = 'reg-error';

  public readonly registrationForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.registrationForm = formBuilder.group<registrationControls>({
      firstName: ['1', [Validators.required]],
      lastName: ['1', [Validators.required]],
      email: ['1', [Validators.required, Validators.email]],
      password: ['1', [Validators.required]],
      confirmPassword: ['1', [Validators.required]],
    }, {

    })
  }

  public handleSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const registrationData = this.registrationForm.value

    console.log(registrationData);

    this.registrationForm.getRawValue()


  }
}
