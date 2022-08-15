import { DateTimeRange } from '../models/date-time-range';
import { DateTimeRangeDto } from '../dtos/date-time-range.dto';

export namespace DateTimeRangeMapper {

  /**
   * Maps dto to model.
   * @param dto Aired dto.
   */
  export function fromDto(dto: DateTimeRangeDto): DateTimeRange {
    const start = dto.start ? new Date(dto.start) : null;
    const end = dto.end ? new Date(dto.end) : null;

    return { start, end };
  }

  /**
   * Maps model to dto.
   * @param model Aired model.
   */
  export function toDto(model: DateTimeRange): DateTimeRangeDto {
    const start = model.start?.toISOString() ?? null;
    const end = model.end?.toISOString() ?? null;

    return { start, end };
  }
}
