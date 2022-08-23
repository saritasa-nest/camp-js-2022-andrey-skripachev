import { StudioDto } from '../dtos/studio.dto';
import { Studio } from '../models/studio';

export namespace StudioMapper {

  /**
   * Maps dto to model.
   * @param dto Studio dto.
   */
  export function fromDto(dto: StudioDto): Studio {
    return new Studio({
      ...dto,
    });
  }
}
