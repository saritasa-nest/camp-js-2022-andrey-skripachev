import { isUserAuthorized } from '../../../scripts/user/validateToken';
import { hideFormErrorMessage, printFormErrorMessage } from '../../../scripts/UI/dom';
import { isValidRegistrationData, registerUser } from '../../../scripts/user/registration';
import { OK_REGISTER_MESSAGE } from '../../../scripts/variables/constants/user';

/** Initializes registration form. */
async function initializeRegistrationForm(): Promise<void> {

  const isAuthorized = await isUserAuthorized();
  if (isAuthorized) {
    window.location.replace('../');
  }

  const form = document.forms.namedItem('registration-form');

  if (form === null) {
    throw new Error('Cannot find registration form');
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    hideFormErrorMessage(form);
    const formData = new FormData(form);

    if (isValidRegistrationData(formData)) {
      const registrationResponse = await registerUser(formData);
      if (registrationResponse === OK_REGISTER_MESSAGE) {
        window.location.replace('../');
      } else {
        printFormErrorMessage(form, registrationResponse);
      }
    } else {
      printFormErrorMessage(form, 'Data is not valid');
    }
  });
}
initializeRegistrationForm();
