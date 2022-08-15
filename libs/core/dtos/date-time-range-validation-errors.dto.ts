import { ValidationError } from '../models/error-response';

import { DateTimeRangeDto } from './date-time-range.dto';

/** Date time validation errors. */
export type DateTimeRangeValidationErrorsDto = ValidationError<DateTimeRangeDto>;
