import { QueryParamsDto } from '../dtos/query-params.dto';
import { QueryParams } from '../models/query-params';

export namespace QueryParamsMapper {

  /**
   * Maps dto to model.
   * @param dto Query params dto.
   */
  export function fromDto(dto: QueryParamsDto): QueryParams {
    return {
      search: dto.search ?? '',
    };
  }

  /**
   * Maps model to dto.
   * @param model Query params model.
   */
  export function toDto(model: QueryParams): QueryParamsDto {
    return {
      search: model.search,
    };
  }
}
