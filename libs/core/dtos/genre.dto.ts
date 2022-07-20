import { GenreType } from '../utils/types/genre';

/** Genre. */
export interface GenreDto {

  /** Id. */
  readonly id: number;

  /** Name. */
  readonly name: string;

  /** Genre type. */
  readonly type: GenreType;
}
