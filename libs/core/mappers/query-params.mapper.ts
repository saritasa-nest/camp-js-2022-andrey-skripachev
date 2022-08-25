import { QueryParams } from '../models/query-params';
import { isType } from '../utils/types/animeType';

import { MAP_TYPE_TO_DTO } from './anime-type.mapper';

/** Query params field names. */
enum QueryParamNames {
  Types = 'types',
  Search = 'search',
  SortTarget = 'sTarget',
  SortDirection = 'sDirection',
}

/** Sorting types. */
export enum SortingDirectionTypes {

  /** Increment. */
  Increment = 'inc',

  /** Decrement. */
  Decrement = 'dec',
}

/**
 * Checks if value is sorting direction.
 * @param value Value.
 */
function isSortingDirection(value: string): value is SortingDirectionTypes {
  return value === SortingDirectionTypes.Decrement || value === SortingDirectionTypes.Increment;
}

/**
 * Maps search params to model.
 * @param searchParams Search params.
 */
export function fromSearchParams(searchParams: URLSearchParams): QueryParams {

  const search = searchParams.get(QueryParamNames.Search) ?? '';
  const sortingDirection = searchParams.get(QueryParamNames.SortDirection) ?? '';
  const sortingTarget = searchParams.get(QueryParamNames.SortTarget) ?? '';
  const types = searchParams.get(QueryParamNames.Types)?.split(',');

  return {
    search,
    sortingDirection: isSortingDirection(sortingDirection) ? sortingDirection : SortingDirectionTypes.Increment,
    sortingTarget,
    types: types ? types.filter(isType) : [],
  };
}

/**
 * Maps query params to search params.
 * @param queryParams Query params.
 */
export function toSearchParams({
  search,
  sortingDirection,
  sortingTarget,
  types,
}: QueryParams): URLSearchParams {
  const searchParams = new URLSearchParams();
  searchParams.set(QueryParamNames.SortDirection, sortingDirection);

  if (search !== '') {
    searchParams.set(QueryParamNames.Search, search);
  }

  if (sortingTarget !== '') {
    searchParams.set(QueryParamNames.SortTarget, sortingTarget);
  }

  if (types.length !== 0) {
    searchParams.set(QueryParamNames.Types, types.join(','));
  }

  return searchParams;
}

const arraySeparator = ',';

export namespace QueryParamsMapper {

  /**
   * Maps ordering to sorting.
   * @param direction Sorting direction.
   * @param target Sorting target.
   */
  function mapSortingToOrdering(direction: SortingDirectionTypes, target: string): string {
    if (direction === SortingDirectionTypes.Decrement) {
      return `-${target}`;
    }

    return target;
  }

  /**
   * Maps model to dto.
   * @param model Query params model.
   */
  export function toDto(model: QueryParams): URLSearchParams {
    const queryParams = new URLSearchParams();
    queryParams.set('limit', '10');
    queryParams.set('ordering', 'id');

    if (model.search !== '') {
      queryParams.set('search', model.search);
    }

    if (model.types.length !== 0) {
      queryParams.set('type__in', model.types
        .map(type => MAP_TYPE_TO_DTO[type])
        .join(arraySeparator));
    }

    const ordering = mapSortingToOrdering(model.sortingDirection, model.sortingTarget);

    if (ordering.length !== 0) {
      queryParams.set('ordering', ordering);
    }

    return queryParams;
  }
}
