import { RegistrationForm } from "../../../scripts/constants";
import { getFormByName } from "../../../scripts/forms";

const registrationForm = getFormByName(RegistrationForm.FORM_NAME);

console.log(registrationForm.email);
