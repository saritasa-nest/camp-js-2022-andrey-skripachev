import { ValidationError } from '../models/error-response';

import { RegistrationDto } from './registration.dto';

/** User validation errors. */
export type UserValidationErrorsDto = ValidationError<RegistrationDto>;
