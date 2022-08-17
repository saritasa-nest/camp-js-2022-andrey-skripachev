import { ValidationError } from './error-response';
import { Registration } from './registration';

/** User validation error. */
export type UserValidationErrors = ValidationError<Registration>;
