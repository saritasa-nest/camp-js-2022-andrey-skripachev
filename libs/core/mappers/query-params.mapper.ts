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
    const searchParams = new URLSearchParams();
    searchParams.set('limit', '10');
    searchParams.set('ordering', 'id');
    if (model.search !== '') {
      searchParams.set('search', model.search);
    }

    return searchParams;
  }
}
