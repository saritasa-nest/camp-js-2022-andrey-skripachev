import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Anime details. */
export interface AnimeDetailsDto extends AnimeDto {

  /** YouTube trailer id. */
  readonly trailer_youtube_id?: string;

  /** Synopsis. */
  readonly synopsis: string;

  /** Is anime airing. */
  readonly airing: boolean;

  /** Studios id list. */
  readonly studios: readonly number[];

  /** Genres id list. */
  readonly genres: readonly number[];

  /** Studios data. */
  readonly studios_data: readonly StudioDto[];

  /** Genres data. */
  readonly genres_data: readonly GenreDto[];
}
