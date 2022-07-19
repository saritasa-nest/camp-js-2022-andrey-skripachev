/** Registration form fields. */
export enum RegistrationFormFields {
  Password = 'password',
  ConfirmPassword = 'confirm-password',
  FirstName = 'first-name',
  LastName = 'last-name',
  Email = 'email',
}

/**
 * Checks if there is a line in the registration form.
 * @param value A string that can be a field in the registration form.
 */
export function isExistsRegistrationField(value: string): value is keyof typeof RegistrationFormFields {
  return value in RegistrationFormFields;
}
