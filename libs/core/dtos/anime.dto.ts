export interface Aired {
  readonly start: string;
  readonly end: string;
}

export interface AnimeDto {

  readonly aired: Aired;
  readonly created: string;
  readonly id: number;
  readonly image: string;
  readonly status: string;
  readonly title_eng: string;
  readonly title_jpn: string;
  readonly type: string;
}
