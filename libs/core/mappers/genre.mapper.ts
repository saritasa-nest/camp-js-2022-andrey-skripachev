import { GenreDto } from '../dtos/genre.dto';
import { Genre } from '../models/genre';

export namespace GenreMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: GenreDto): Genre {
    return new Genre({
      ...dto,
    });
  }

  /**
   * Maps model to dto.
   * @param model Genre model.
   */
  export function toDto(model: Genre): GenreDto {
    return { ...model };
  }
}
