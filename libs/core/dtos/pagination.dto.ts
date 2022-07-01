/** Pagination meta info. */
export interface PaginationDto {

  /** Total count of items. */
  readonly count: number;

  /** Next page of items. */
  readonly next: string;

  /** Previous page of items. */
  readonly previous: string;
}
