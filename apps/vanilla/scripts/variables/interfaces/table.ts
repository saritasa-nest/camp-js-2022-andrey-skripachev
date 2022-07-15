/** Data to update the table. */
export interface TableUpdateData<T>{

  /** Number of the first item in the list. */
  readonly firstElement: number;

  /** The number of the last item in the list. */
  readonly lastElement: number;

  /** Total number of elements. */
  readonly totalElements: number;

  /** List of items received on request. */
  readonly results: readonly T[];
}
