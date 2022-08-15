import { AnimeDetails } from './anime-details';
import { DateTimeRangeValidationErrors } from './date-time-range-validation-errors';
import { ValidationError } from './error-response';

export type AnimeValidationErrors =
  ValidationError<AnimeDetails> |
  {
    readonly aired: DateTimeRangeValidationErrors;
  };
