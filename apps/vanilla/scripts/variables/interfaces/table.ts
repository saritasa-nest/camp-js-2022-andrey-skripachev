/** Data to update the table. */
export interface TableUpdateData<T>{

  /** List of items received on request. */
  readonly results: readonly T[];
}
