import { Pipe, PipeTransform } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { Sorting } from '../../core/models/sorting';
import { SortingMapper } from '../../core/services/mappers/sorting.mapper';

/** Pipe to transform sorting object to angular sort. */
@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {

  /** @inheritdoc */
  public transform(value: Sorting | null): Sort | null {
    return value && SortingMapper.toSort(value);
  }

}
