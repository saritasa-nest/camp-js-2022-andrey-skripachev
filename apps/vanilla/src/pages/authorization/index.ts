import { hideFormErrorMessage, printFormErrorMessage } from '../../../scripts/UI/dom';
import { authorizeUser } from '../../../scripts/user/authorization';
import { isUserAuthorized } from '../../../scripts/user/validateToken';
import { OK_MESSAGE } from '../../../scripts/variables/constants/user';

/** Initialize authorization form. */
async function initAuthorization(): Promise<void> {
  const isAuthorized = await isUserAuthorized();
  if (isAuthorized) {
    window.location.replace('../');
  }

  const form = document.forms.namedItem('authorization-form');
  if (form === null) {
    throw new Error('Cannot find authorization form');
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    hideFormErrorMessage(form);
    const formData = new FormData(form);

    const authorizationResponse = await authorizeUser(formData);
    if (authorizationResponse === OK_MESSAGE) {
      window.location.replace('../');
    } else {
      printFormErrorMessage(form, authorizationResponse);
    }
  });
}
initAuthorization();
