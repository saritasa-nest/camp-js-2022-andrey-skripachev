import { Sorting } from '../mappers/query-params.mapper';
import { AnimeType } from '../utils/types/animeType';

/** Search query params. */
export interface QueryParams {

  /** Searching anime title. */
  readonly search: string;

  /** Searching anime types. */
  readonly types: AnimeType[];

  /** Sorted anime field. */
  readonly sorting: Sorting;
}
