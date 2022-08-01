import { Pipe, PipeTransform } from '@angular/core';
import { AnimeStatus } from '@js-camp/core/utils/types/animeStatus';

const MAP_TO_READABLE_STATUS: Readonly<Record<AnimeStatus, string>> = {
  [AnimeStatus.Airing]: 'Airing',
  [AnimeStatus.Finished]: 'Finished',
  [AnimeStatus.NotYetAired]: 'Not yet aired',
};

/** Pipe to convert anime status into readable form. */
@Pipe({
  name: 'animeStatus',
})
export class AnimeStatusPipe implements PipeTransform {

  /**
   * Converts anime status to readable form.
   * @inheritdoc
   */
  public transform(value: AnimeStatus): string {
    return MAP_TO_READABLE_STATUS[value];
  }

}
