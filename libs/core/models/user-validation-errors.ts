import { ValidationError } from './error-response';
import { Registration } from './registration';

export type UserValidationErrors = ValidationError<Registration>;
