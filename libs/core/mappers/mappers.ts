/**
 * Mapper.
 */
export interface Mapper<T, R> {

  /**
   * Maps from dto to model.
   * @param dto Dto.
   */
  readonly fromDto?: (dto: T) => R;

  /**
   * Maps model to dto.
   * @param model Model.
   */
  readonly toDto?: (model: R) => T;

}
