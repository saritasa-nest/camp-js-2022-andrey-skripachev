import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Transfer object for anime details. */
export interface AnimeDetailsDto extends AnimeDto {

  /** Id of the youtube trailer. */
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

  /** Source. */
  readonly source: string;

  /** Age rating. */
  readonly rating: string;

  /** Release season. */
  readonly season: string;

  /** Background. */
  readonly background: string;
}
