import { Pipe, PipeTransform } from '@angular/core';
import { AnimeType } from '@js-camp/core/utils/types/animeType';

const MAP_TO_READABLE_TYPE: Readonly<Record<AnimeType, string>> = {
  [AnimeType.Movie]: 'Movie',
  [AnimeType.Music]: 'Music',
  [AnimeType.ONA]: 'ONA',
  [AnimeType.OVA]: 'OVA',
  [AnimeType.Special]: 'Special',
  [AnimeType.TV]: 'TV',
};

/** Pipe to convert anime type into readable form. */
@Pipe({
  name: 'animeType',
})
export class AnimeTypePipe implements PipeTransform {

  /**
   * Converts anime type into readable form.
   * @inheritdoc
   */
  public transform(value: AnimeType): string {
    return MAP_TO_READABLE_TYPE[value];
  }

}
