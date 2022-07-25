import { Pipe, PipeTransform } from '@angular/core';

import { AnimeType } from '../../core/utils/types/animeType';

/** Converts anime type into readable form. */
@Pipe({
  name: 'animeType',
})
export class AnimeTypePipe implements PipeTransform {

  /** @inheritdoc */
  public transform(value: string): string {
    const animeType = AnimeType.toAnimeType(value);
    return AnimeType.toReadable(animeType) ?? value;
  }

}
