import { AnimeType } from '../utils/types/anime';

/**
 * Checks if the value is a type.
 * @param value Value, possibly being a type.
 */
export function isType(value: AnimeType | string): value is AnimeType {
  return Object.keys(AnimeType).includes(value as AnimeType);
}
