/** Data to update the table. */
export interface TableUpdateData<T>{

  /** Information about the user's position in the total list. */
  positionInfo: string;

  /** List of items received on request. */
  results: readonly T[];
}
