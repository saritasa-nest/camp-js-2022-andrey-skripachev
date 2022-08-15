import { TokenDto } from '../dtos/token.dto';
import { Token } from '../models/token';

export namespace TokenMapper {

  /**
   * Maps fto to model.
   * @param dto Token dto.
   */
  export function fromDto(dto: TokenDto): Token {
    return {
      access: dto.access,
      refresh: dto.refresh,
    };
  }

  /**
   * Maps model to dto.
   * @param model Token model.
   */
  export function toDto(model: Token): TokenDto {
    return {
      access: model.access,
      refresh: model.refresh,
    };
  }
}
