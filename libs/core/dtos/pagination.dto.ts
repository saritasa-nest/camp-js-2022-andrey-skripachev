/** Transfer object for pagination data. */
export interface PaginationDto<T> {

  /** Total number of results. */
  readonly count: number;

  /** Next request page. */
  readonly next: string;

  /** Previous request page. */
  readonly previous: string;

  /** Received results. */
  readonly results: readonly T[];
}
