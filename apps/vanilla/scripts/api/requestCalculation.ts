export namespace RequestCalculationData {

  /**
   * Calculates the offset by page number and maximum number of anime on one page.
   * @param page Page number.
   * @param limit Maximum number if anime on one page.
   * @returns Offset.
   */
  export function offset(page: number, limit: number): number {
    return page * limit;
  }

}
