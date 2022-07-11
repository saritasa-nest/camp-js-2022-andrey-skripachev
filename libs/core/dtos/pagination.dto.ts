export interface PaginationDto {

  /** Total count of anime. */
  readonly count: number;

  /** Maximum number of received anime. */
  readonly limit: number;

  /** The number of the first received element. */
  readonly offset: number;
}
