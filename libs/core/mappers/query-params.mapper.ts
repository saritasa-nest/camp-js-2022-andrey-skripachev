import { QueryParamsDto } from '../dtos/query-params.dto';
import { QueryParams } from '../models/query-params';

export namespace QueryParamsMapper {

  /**
   * Maps dto to model.
   * @param dto Query params dto.
   */
  export function fromDto(dto: URLSearchParams): QueryParams {
    return {
      search: dto.get('search') ?? '',
    };
  }

  /**
   * Maps model to dto.
   * @param model Query params model.
   */
  export function toDto(model: QueryParams): URLSearchParams {
    return new URLSearchParams({
      search: model.search,
      limit: '10',
      ordering: 'id',
    });
  }
}
