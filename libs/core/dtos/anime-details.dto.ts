<<<<<<< HEAD
import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Anime details. */
export interface AnimeDetailsDto extends AnimeDto {

  /** Id of the YouTube trailer. */
  readonly trailer_youtube_id?: string;

  /** Synopsis. */
  readonly synopsis: string;

  /** Is anime airing. */
  readonly airing: boolean;

  /** ID of the studios that created the anime. */
  readonly studios: readonly number[];

  /** ID of genres the anime belongs to. */
  readonly genres: readonly number[];

  /** Studios that created the anime. */
  readonly studios_data: readonly StudioDto[];

  /** Genres the anime belongs to. */
  readonly genres_data: readonly GenreDto[];

  /** Source. */
  readonly source: string;

  /** Age rating. */
  readonly rating: string;

  /** Release season. */
  readonly season: string;

  /** Background. */
  readonly background: string;
}
=======
import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Anime details. */
export interface AnimeDetailsDto extends AnimeDto {

  /** Id of the YouTube trailer. */
  readonly trailer_youtube_id?: string;

  /** Synopsis. */
  readonly synopsis: string;

  /** Is anime airing. */
  readonly airing: boolean;

  /** ID of the studios that created the anime. */
  readonly studios: readonly number[];

  /** Genres id list. */

  /** ID of genres the anime belongs to. */
  readonly genres: readonly number[];

  /** Studios data. */

  /** Studios that created the anime. */
  readonly studios_data: readonly StudioDto[];

  /** Genres the anime belongs to. */
  readonly genres_data: readonly GenreDto[];
}
>>>>>>> feature/JC19-438-details-for-anime
