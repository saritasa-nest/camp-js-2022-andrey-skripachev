import { Studio } from '../models/studio';
import { StudioDto } from '../dtos/studio.dto';

export namespace StudioMapper {

  /**
   * Maps dto to model.
   * @param dto Studio dto.
   */
  export function fromDto(dto: StudioDto): Studio {
    return new Studio({
      id: dto.id,
      name: dto.name,
    });
  }
}
