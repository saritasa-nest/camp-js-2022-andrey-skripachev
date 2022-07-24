import { DateTimeRange } from '../../models/dateTimeRange';
import { DateTimeRangeDto } from './dtos/dateTimeRange.dto';

export namespace DateTimeRangeMapper {

  /**
   * Maps dto to model.
   * @param dto Aired dto.
   */
  export function fromDto(dto: DateTimeRangeDto): DateTimeRange {
    const start = new Date(dto.start);
    const end = new Date(dto.end);

    return new DateTimeRange({ start, end });
  }
}
