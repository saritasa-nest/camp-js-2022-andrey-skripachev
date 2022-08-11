import { StudioDto } from "../dtos/studio.dto";
import { Studio } from "../models/studio";

export namespace StudioMapper {

  export function fromDto(dto: StudioDto): Studio {
    return new Studio({
      ...dto,
    })
  }

  export function toDto(model: Studio): StudioDto {
    const { name, id } = model;
    return { name, id };
  }

}
