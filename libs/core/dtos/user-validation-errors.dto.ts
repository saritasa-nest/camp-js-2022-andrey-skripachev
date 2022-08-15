import { ValidationError } from '../models/error-response';

import { RegistrationDto } from './registration.dto';

export type UserValidationErrorsDto = ValidationError<RegistrationDto>;
