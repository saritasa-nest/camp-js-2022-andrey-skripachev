import { ValidationError } from '../models/error-response';

import { AnimeDetailsDto } from './anime-details.dto';
import { DateTimeRangeValidationErrorsDto } from './date-time-range-validation-errors.dto';

/** Anime validation errors. */
export type AnimeValidationErrorsDto =
  ValidationError<AnimeDetailsDto> &
  {
    readonly aired: DateTimeRangeValidationErrorsDto;
  };