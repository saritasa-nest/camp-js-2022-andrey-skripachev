/** Different statuses of anime. */
export enum AnimeStatus {
  Airing = 'Airing',
  Finished = 'Finished',
  NotYetAired = 'NotYetAired',
}

/**
 * Checks if the value is a status.
 * @param value Value, possibly being a status.
 */
export function isStatus(value: string): value is AnimeStatus {
  return Object.keys(AnimeStatus).includes(value as AnimeStatus);
}

  /**
   * Converts the value to a status if it exists in the statuses.
   * @param value String for conversion.
   */
  export function toAnimeStatus(value: string): AnimeStatus {
    return isStatus(value) ? value : AnimeStatus.NotYetAired;
  }


