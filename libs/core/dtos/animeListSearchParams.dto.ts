export interface AnimeListSearchParamsDto {
  readonly limit: number;

  readonly offset: number;

  readonly ordering: string;

  readonly type: string;

  readonly search: string;
}
