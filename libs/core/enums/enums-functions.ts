export function reverseMapper<T, R>(mapper: Readonly<Record<T, R>>): Readonly<Record<R, T>> {
  return Object.entries(mapper).map(([map, result]) => [result, map]);

}

export function elementInEnum<T>(value: string | number, currentEnum: T): 
