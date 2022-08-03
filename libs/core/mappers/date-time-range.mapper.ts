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

    return new DateTimeRange({ start, end });
  }
}
