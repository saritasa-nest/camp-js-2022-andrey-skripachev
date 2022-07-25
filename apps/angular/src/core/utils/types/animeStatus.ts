/** Different statuses of anime. */
export enum AnimeStatus {
  AIRING = 'AIRING',
  FINISHED = 'FINISHED',
  NOT_YET_AIRED = 'NOT_YET_AIRED',
}

const MAP_TO_READABLE_STATUS: Readonly<Record<AnimeStatus, string>> = {
  [AnimeStatus.AIRING]: 'Airing',
  [AnimeStatus.FINISHED]: 'Finished',
  [AnimeStatus.NOT_YET_AIRED]: 'Not yet aired',
};

/**
 * Checks if the value is a status.
 * @param value Value, possibly being a status.
 */
export function isStatus(value: string): value is AnimeStatus {
  return Object.keys(AnimeStatus).includes(value as AnimeStatus);
}

export namespace AnimeStatus {

  /**
   * Converts anime status into readable form.
   * @param value Anime status.
   */
  export function toReadable(value: AnimeStatus | null): string | null {
    return value !== null ? MAP_TO_READABLE_STATUS[value] : null;
  }

  /**
   * Converts the value to a status if it exists in the statuses.
   * @param value String for conversion.
   */
  export function toAnimeStatus(value: string): AnimeStatus | null {
    return isStatus(value) ? value : null;
  }

}
