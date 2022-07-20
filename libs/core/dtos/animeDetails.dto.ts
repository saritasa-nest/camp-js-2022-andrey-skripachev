import { DateTimeRangeDto } from './dateTimeRange.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Anime detailed info. */
export interface AnimeDetailsDto {

  /** Aired start / end. */
  readonly aired: DateTimeRangeDto;

  /** Anime id. */
  readonly id: number;

  /** Anime image. */
  readonly image: string;

  /** Anime status. */
  readonly status: string;

  /** Anime title in English. */
  readonly title_eng: string;

  /** Anime title in Japanese. */
  readonly title_jpn: string;

  /** Anime type. */
  readonly type: string;

  /** Anime synopsis. */
  readonly synopsis: string;

  /** Is anime airing. */
  readonly airing: boolean;

  /** Anime studios. */
  readonly studios_data: readonly StudioDto[];

  /** Anime genres. */
  readonly genres_data: readonly GenreDto[];
}
