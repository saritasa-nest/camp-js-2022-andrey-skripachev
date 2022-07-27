import { Pipe, PipeTransform } from '@angular/core';
import { AnimeStatus } from '@js-camp/core/utils/types/animeStatus';

/** Converts anime status into readable form. */
@Pipe({
  name: 'animeStatus',
})
export class AnimeStatusPipe implements PipeTransform {

  /** @inheritdoc */
  public transform(value: AnimeStatus): string {
    return AnimeStatus.toReadable(value);
  }

}
