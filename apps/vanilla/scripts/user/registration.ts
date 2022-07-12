import { isExistsRegistrationField, RegistrationFormFields } from '@js-camp/core/enums/registration';
import { Registration } from '@js-camp/core/models/registration';

import { Api } from '../api/api';
import { ACCESS, OK_MESSAGE, REFRESH } from '../variables/constants';
import { Token } from '../variables/interfaces';

/**
 * Checks fields for empty values and equality of passwords.
 * @param formData Registration form data.
 * @returns Whether or not the form has passed inspection.
 */
export function isValidRegistrationData(formData: FormData): boolean {
  for (const key in RegistrationFormFields) {
    if (isExistsRegistrationField(key)) {
      const inputValue = String(formData.get(RegistrationFormFields[key]) ?? '');
      if (inputValue.length === 0) {
        return false;
      }
    }
  }

  const password = String(formData.get(RegistrationFormFields.Password));
  const confirmPassword = String(formData.get(RegistrationFormFields.ConfirmPassword));

  return password === confirmPassword;
}

/**
 * Sends the user registration request and processes the response.
 * @param formData Registration form data.
 * @returns Data to be displayed on the client side.
 */
export async function RegisterUser(formData: FormData): Promise<string> {
  const avatar = `
    https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/user_avatars%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg
  `;

  const registration = new Registration({
    firstName: String(formData.get(RegistrationFormFields.FirstName)),
    lastName: String(formData.get(RegistrationFormFields.LastName)),
    email: String(formData.get(RegistrationFormFields.Email)),
    password: String(formData.get(RegistrationFormFields.Password)),
    avatar,
  });

  const result = await Api.userApi.registerUser(registration);

  if (isToken(result)) {
    localStorage.setItem(ACCESS, result.access);
    localStorage.setItem(REFRESH, result.refresh);
    return OK_MESSAGE;
  }

  if (result.data === undefined) {
    return result.detail;
  }

  const { password, email } = result.data;

  if (password === undefined) {
    return String(email);
  }

  return String(password);
}

/**
 * Checks if the object is a token.
 * @param object An object that can be a token.
 * @returns Is the object a token.
 */
function isToken(object: object): object is Token {
  return 'refresh' in object;
}
