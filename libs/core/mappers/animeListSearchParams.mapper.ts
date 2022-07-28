import { Sort } from '@angular/material/sort';

import { AnimeListSearchParams } from '../models/animeListSearchParams';
import { AnimeListSearchParamsDto } from '../dtos/animeListSearchParams.dto';
import { isTypeDto, mapAnimeTypeFromDto, mapAnimeTypeToDto } from '../utils/types/animeType';

export namespace AnimeListSearchParamsMapper {

  /**
   * Maps ordering to sorting.
   * @param ordering Ordering.
   */
  function fromOrderingToSort(ordering: string): Sort {
    if (ordering === '') {
      return {
        active: '',
        direction: '',
      };
    } else if (ordering[0] === '-') {
      return {
        active: ordering.slice(1),
        direction: 'desc',
      };
    }

    return {
      active: ordering,
      direction: 'asc',
    };
  }

  /**
   * Maps sorting to ordering.
   * @param sort Sort.
   */
  function fromSortingToOrdering({ direction, active }: Sort): string {
    if (direction === '') {
      return '';
    }

    return `${direction === 'asc' ? '' : '-'}${active}`;
  }

  /**
   * Maps dto to model.
   * @param dto Search params dto.
   */
  export function fromDto(dto: AnimeListSearchParamsDto): AnimeListSearchParams {
    const { limit, offset, ordering, type__in, search } = dto;

    const types = type__in
      .split(',')
      .filter(isTypeDto)
      .map(mapAnimeTypeFromDto);

    return new AnimeListSearchParams({
      pageNumber: Math.floor(offset / limit),
      maximumItemsOnPage: limit,
      titlePart: search,
      sorting: fromOrderingToSort(ordering),
      types,
    });
  }

  /**
   * Maps model to dto.
   * @param model Search params model.
   */
  export function toDto(model: AnimeListSearchParams): AnimeListSearchParamsDto {
    const { pageNumber, maximumItemsOnPage, sorting, titlePart, types } = model;

    return {
      limit: maximumItemsOnPage,
      offset: pageNumber * maximumItemsOnPage,
      ordering: fromSortingToOrdering(sorting),
      search: titlePart,
      type__in: types.map(mapAnimeTypeToDto).join(','),
    };
  }
}
