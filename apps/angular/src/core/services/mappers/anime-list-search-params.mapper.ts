import { Sort } from '@angular/material/sort';
import { Params } from '@angular/router';
import { isTypeDto, mapAnimeTypeFromDto, mapAnimeTypeToDto } from '@js-camp/core/mappers/anime-type.mapper';

import { AnimeListSearchParams } from '../../models/anime-list-search-params';

import { AnimeListSearchParamsDto } from './dto/anime-list-search-params.dto';

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
  export function fromDto(dto: AnimeListSearchParamsDto | Params): AnimeListSearchParams {
    const { limit = 10, offset = 0, ordering = '', type__in = '', search = '' } = dto;

    const types = type__in
      .split(',')
      .filter(isTypeDto)
      .map(mapAnimeTypeFromDto);

    return new AnimeListSearchParams({
      pageNumber: Math.floor(offset / limit),
      maximumItemsOnPage: limit,
      searchingTitlePart: search,
      sorting: fromOrderingToSort(ordering),
      types,
    });
  }

  /**
   * Maps model to dto.
   * @param model Search params model.
   */
  export function toDto(model: AnimeListSearchParams): AnimeListSearchParamsDto {
    const { pageNumber, maximumItemsOnPage, sorting, searchingTitlePart, types } = model;

    return {
      limit: maximumItemsOnPage,
      offset: pageNumber * maximumItemsOnPage,
      ordering: fromSortingToOrdering(sorting),
      search: searchingTitlePart,
      type__in: types.map(mapAnimeTypeToDto).join(','),
    };
  }
}
