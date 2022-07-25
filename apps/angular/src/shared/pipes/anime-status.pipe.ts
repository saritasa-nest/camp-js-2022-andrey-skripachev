import { Pipe, PipeTransform } from '@angular/core';

import { AnimeStatus } from '../../core/utils/types/animeStatus';

/** Converts anime status into readable form. */
@Pipe({
  name: 'animeStatus',
})
export class AnimeStatusPipe implements PipeTransform {

  /** @inheritdoc */
  public transform(value: string): string {
    const animeStatus = AnimeStatus.toAnimeStatus(value);
    return AnimeStatus.toReadable(animeStatus) ?? value;
  }

}
