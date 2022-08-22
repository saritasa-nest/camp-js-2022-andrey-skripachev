export interface QueryParamsDto {

  /** Maximum entities received count. */
  readonly limit?: number;

  /** Sorting target and direction. */
  readonly ordering?: string;

  /** Searching anime title. */
  readonly search?: string;

  /** Anime type. */
  readonly type?: string;
}
