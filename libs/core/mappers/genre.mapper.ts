import { GenreDto } from "../dtos/genre.dto";
import { Genre } from "../models/genre";

export namespace GenreMapper {
  export function fromDto(dto: GenreDto): Genre {
    return new Genre({
      ...dto,
    })
  }

  export function toDto(model: Genre): GenreDto {
    const { name, id } = model;
    return { name, id };
  }
}
