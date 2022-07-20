import { Status } from '../utils/types/anime';

/**
 * Checks if the value is a status.
 * @param value Value, possibly being a status.
 */
export function isStatus(value: keyof Status | string): value is Status {
  return Object.keys(Status).includes(value as Status);
}
