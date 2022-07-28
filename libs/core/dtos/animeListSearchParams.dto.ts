/** Search params for getting anime list. */
export interface AnimeListSearchParamsDto {

  /** Maximum items received from server. */
  readonly limit: number;

  /** Number of the first received item. */
  readonly offset: number;

  /** Sorting direction and target. */
  readonly ordering: string;

  /** Searched anime types. */
  readonly type__in: string;

  /** Part of the anime title. */
  readonly search: string;
}
