import { Aired } from '../models/aired';
import { AiredDto } from '../dtos/aired.dto';

export namespace AiredMapper {

  /**
   * Maps dto to model.
   * @param dto Aired dto.
   */
  export function fromDto(dto: AiredDto): Aired {
    const start = new Date(dto.start);
    const end = new Date(dto.end);

    return new Aired({ start, end });
  }
}
