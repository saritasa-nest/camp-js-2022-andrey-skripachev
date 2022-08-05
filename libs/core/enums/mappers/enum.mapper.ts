/**
 * Maps value by key to another value.
 * @param key Key.
 * @param mapper Enums mapper.
 */
export function mapEnumValue<From extends string | number | symbol, To>(
  key: From,
  mapper: Readonly<Record<From, To>>,
): To {
  return mapper[key];
}
