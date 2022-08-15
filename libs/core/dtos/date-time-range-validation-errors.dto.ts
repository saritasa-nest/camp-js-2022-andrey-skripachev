import { ValidationError } from '../models/error-response';

import { DateTimeRangeDto } from './date-time-range.dto';

export type DateTimeRangeValidationErrorsDto = ValidationError<DateTimeRangeDto>;
