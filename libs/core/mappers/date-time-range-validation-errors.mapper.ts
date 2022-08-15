import { DateTimeRangeValidationErrorsDto } from '../dtos/date-time-range-validation-errors.dto';
import { DateTimeRangeValidationErrors } from '../models/date-time-range-validation-errors';

export namespace DateTimeRangeValidationErrorsMapper {

  /**
   * Maps dto to model.
   * @param dto Date time range validation errors dto.
   */
  export function fromDto(
    dto: DateTimeRangeValidationErrorsDto,
  ): DateTimeRangeValidationErrors {
    return {
      start: dto.start,
      end: dto.end,
    };
  }

}
