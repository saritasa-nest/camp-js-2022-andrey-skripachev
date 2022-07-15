import { AnimeStatus } from '../utils/types/anime';

/**
 * Checks if the value is a status.
 * @param value Value, possibly being a status.
 */
export function isStatus(value: keyof AnimeStatus | string): value is AnimeStatus {
  return Object.keys(AnimeStatus).includes(value as AnimeStatus);
}
