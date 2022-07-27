import { AnimeListSearchParams } from "../models/animeListSearchParams";
import { AnimeListSearchParamsDto } from "../dtos/animeListSearchParams.dto";
import { Sort } from "@angular/material/sort";
import { isTypeDto, mapAnimeTypeFromDto, mapAnimeTypeToDto } from "../utils/types/animeType";

export namespace AnimeListSearchParamsMapper {

  function fromOrderingToSort(ordering: string): Sort {
    const decreaseOrderingPattern = /^\-(.*)\,/;
    const increaseOrderingPattern = /^(.*),/;

    const sort: Sort = {
      active: '',
      direction: '',
    };

    const matchedDecrease = decreaseOrderingPattern.exec(ordering);
    const matchedIncrease = increaseOrderingPattern.exec(ordering);
    if (matchedDecrease !== null) {
      sort.active = matchedDecrease[0];
      sort.direction = 'asc';
    } else if (matchedIncrease !== null) {
      sort.active = matchedIncrease[0];
      sort.direction = 'desc';
    }

    return sort;
  }

  function fromSortingToOrdering({ direction, active }: Sort): string {
    if (direction === '') {
      return 'id';
    }

    return `${direction === 'asc' ? '' : '-'}${active}`;
  }

  export function fromDto(dto: AnimeListSearchParamsDto): AnimeListSearchParams {
    console.log(dto);
    const { limit, offset, ordering, type__in, search} = dto;

    const types = type__in.split(',').filter(isTypeDto).map(mapAnimeTypeFromDto)

    return new AnimeListSearchParams({
      pageNumber: Math.floor(offset / limit),
      maximumItemsOnPage: limit,
      titlePart: search,
      sorting: fromOrderingToSort(ordering),
      types,
    });
  }

  export function toDto(model: AnimeListSearchParams): AnimeListSearchParamsDto {
    const { pageNumber, maximumItemsOnPage, sorting, titlePart, types } = model;

    return {
      limit: maximumItemsOnPage,
      offset: pageNumber * maximumItemsOnPage,
      ordering: fromSortingToOrdering(sorting),
      search: titlePart,
      type__in: types.map(mapAnimeTypeToDto).join(','),
    }
  }
}
