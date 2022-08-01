import { Pipe, PipeTransform } from '@angular/core';

/** Pipe for transforming empty string. */
@Pipe({
  name: 'emptyString',
})
export class EmptyStringPipe implements PipeTransform {

  /**
   * Transforms empty string into default value.
   * @inheritdoc
   */
  public transform(value: string | null): string {
    return value === null || value === '' ? '-' : value;
  }

}
