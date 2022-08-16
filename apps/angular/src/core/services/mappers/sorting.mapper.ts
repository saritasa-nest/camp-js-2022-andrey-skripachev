import { Sort, SortDirection } from '@angular/material/sort';

import { Sorting, SortingDirection } from '../../models/sorting';

const mapperSortToSortingDirection: Readonly<Record<SortDirection, SortingDirection>> = {
  'asc': 'inc',
  'desc': 'dec',
  '': '',
};

const mapperSortingToSortDirection: Readonly<Record<SortingDirection, SortDirection>> = {
  'inc': 'asc',
  'dec': 'desc',
  '': '',
};

export namespace SortingMapper {

  /**
   * Maps sort to sorting.
   * @param sort Sort.
   */
  export function fromSort(sort: Sort): Sorting {
    return {
      target: sort.active,
      direction: mapperSortToSortingDirection[sort.direction],
    };
  }

  /**
   * Maps sorting to sort.
   * @param sorting Sorting.
   */
  export function toSort(sorting: Sorting): Sort {
    return {
      active: sorting.target,
      direction: mapperSortingToSortDirection[sorting.direction],
    };
  }

}
