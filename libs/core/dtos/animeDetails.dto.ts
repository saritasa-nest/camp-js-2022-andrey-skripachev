import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

export interface AnimeDetailsDto {

  readonly aired: {
    readonly start: string;
    readonly end: string;
  };
  readonly id: number;
  readonly image: string;
  readonly status: string;
  readonly title_eng: string;
  readonly title_jpn: string;
  readonly type: string;
  readonly synopsis: string;
  readonly airing: boolean;
  readonly studios: readonly number[];
  readonly studios_data: readonly StudioDto[];
  readonly genres: readonly number[];
  readonly genres_data: readonly GenreDto[];
}
