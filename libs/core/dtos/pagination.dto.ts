export interface PaginationDto {

  /** Total count of elements. */
  readonly count: number;

  /** Maximum number of received elements. */
  readonly limit: number;

  /** The number of the first received element. */
  readonly offset: number;
}
