import { Type } from '../utils/types/anime';

/**
 * Checks if the value is a type.
 * @param value Value, possibly being a type.
 */
export function isType(value: keyof Type | string): value is Type {
  return Object.keys(Type).includes(value as Type);
}
