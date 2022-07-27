import { AnimeStatusDto } from '../../dtos/anime.dto';

/** Different statuses of anime. */
export enum AnimeStatus {
  Airing = 'Airing',
  Finished = 'Finished',
  NotYetAired = 'NotYetAired',
}

const STATUS_FROM_DTO: Readonly<Record<AnimeStatusDto, AnimeStatus>> = {
  [AnimeStatusDto.AIRING]: AnimeStatus.Airing,
  [AnimeStatusDto.FINISHED]: AnimeStatus.Finished,
  [AnimeStatusDto.NOT_YET_AIRED]: AnimeStatus.NotYetAired,
};

const MAP_TO_READABLE_STATUS: Readonly<Record<AnimeStatus, string>> = {
  [AnimeStatus.Airing]: 'Airing',
  [AnimeStatus.Finished]: 'Finished',
  [AnimeStatus.NotYetAired]: 'Not yet aired',
};

/**
 * Mapper for anime status.
 * @param statusDto Status dto.
 */
export function mapAnimeStatusFromDto(statusDto: AnimeStatusDto): AnimeStatus {
  return STATUS_FROM_DTO[statusDto];
}

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
  export function toReadable(value: AnimeStatus): string {
    return MAP_TO_READABLE_STATUS[value];
  }

  /**
   * Converts the value to a status if it exists in the statuses.
   * @param value String for conversion.
   */
  export function toAnimeStatus(value: string): AnimeStatus | null {
    return isStatus(value) ? value : null;
  }

}
