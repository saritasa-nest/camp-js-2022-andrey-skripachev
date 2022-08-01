import { Pipe, PipeTransform } from '@angular/core';

/** Pipe to transform empty value into string. */
@Pipe({
  name: 'emptyValueHandler',
})
export class EmptyValuePipe implements PipeTransform {

  /**
   * Transforms empty value into string.
   * @inheritdoc
   */
  public transform(value: string | null | undefined): string {
    return value ? value : '-';
  }

}
