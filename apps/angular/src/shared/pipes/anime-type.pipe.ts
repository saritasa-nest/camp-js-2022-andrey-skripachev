import { Pipe, PipeTransform } from '@angular/core';
import { AnimeType } from '@js-camp/core/utils/types/animeType';

/** Converts anime type into readable form. */
@Pipe({
  name: 'animeType',
})
export class AnimeTypePipe implements PipeTransform {

  /** @inheritdoc */
  public transform(value: AnimeType): string {
    return AnimeType.toReadable(value);
  }

}
