import { isTypeDto } from '../dtos/anime.dto';
import { QueryParams } from '../models/query-params';

import { MAP_TYPE_FROM_DTO, MAP_TYPE_TO_DTO } from './anime-type.mapper';

/** Query params field names. */
enum QueryParamNames {
  TypeIn = 'type__in',
  Limit = 'limit',
  Search = 'search',
  Offset = 'offset',
  Ordering = 'ordering',
}

const arraySeparator = ',';

export namespace QueryParamsMapper {

  /**
   * Maps dto to model.
   * @param dto Query params dto.
   */
  export function fromDto(dto: URLSearchParams): QueryParams {

    const types = dto.get(QueryParamNames.TypeIn);

    return {
      search: dto.get(QueryParamNames.Search) ?? '',
      types: types ? types
        .split(arraySeparator)
        .filter(isTypeDto)
        .map(type => MAP_TYPE_FROM_DTO[type]) : [],
    };
  }

  /**
   * Maps model to dto.
   * @param model Query params model.
   */
  export function toDto(model: QueryParams): URLSearchParams {
    const searchParams = new URLSearchParams();
    searchParams.set(QueryParamNames.Limit, '10');
    searchParams.set(QueryParamNames.Ordering, 'id');

    if (model.search !== '') {
      searchParams.set(QueryParamNames.Search, model.search);
    }

    if (model.types.length !== 0) {
      searchParams.set(QueryParamNames.TypeIn, model.types
        .map(type => MAP_TYPE_TO_DTO[type])
        .join(arraySeparator));
    }

    return searchParams;
  }
}
