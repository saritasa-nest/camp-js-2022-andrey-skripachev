import { AnimeDto } from "./anime.dto";
import { GenreDto } from "./genre.dto";
import { StudioDto } from "./studio.dto";

export interface AnimeDetailsDto extends AnimeDto {
  readonly trailer_youtube_id?: string;
  readonly synopsis: string;
  readonly airing: boolean;
  readonly studios: readonly number[];
  readonly genres: readonly number[];
  readonly studios_data: readonly StudioDto[];
  readonly genres_data: readonly GenreDto[];
}
