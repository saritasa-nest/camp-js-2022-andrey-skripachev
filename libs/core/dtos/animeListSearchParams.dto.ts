export interface AnimeListSearchParamsDto {
  readonly limit: number;

  readonly offset: number;

  readonly ordering: string;

  readonly type__in: string;

  readonly search: string;
}
