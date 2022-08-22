type EnumValue = string | number | symbol;

interface EnumObject {
  [key: EnumValue]: EnumValue;
}
export type EnumMapper<T extends EnumValue, R extends EnumValue> = Readonly<Record<T, R>>;

/**
 * Reverses type mapper.
 * @param typeMapper Type mapper to reverse.
 * @returns
 */
export function reverseEnumMapper<T extends EnumValue, R extends EnumValue>(
  typeMapper: EnumMapper<T, R>,
): EnumMapper<R, T> {
  const reversedMapper: EnumObject = {};

  for (const [mapper, value] of Object.entries(typeMapper)) {
    reversedMapper[value as EnumValue] = mapper;
  }

  return { ...reversedMapper } as EnumMapper<R, T>;
}

/**
 * Maps enum to array of enum values.
 * @param enumeration Enum to mapping.
 */
export function parseEnumToArray<T>(enumeration: T): T[keyof T][] {
  return (Object.keys(enumeration) as Array<keyof T>)
    .filter(key => isNaN(Number(key)))
    .filter(key => typeof enumeration[key] === 'string')
    .map(key => enumeration[key]);
}
