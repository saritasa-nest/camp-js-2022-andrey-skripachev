/** Data to update the table. */
export interface TableUpdateData<T>{

  readonly firstElement: number;

  readonly lastElement: number;

  readonly totalElements: number;

  /** List of items received on request. */
  results: readonly T[];
}
