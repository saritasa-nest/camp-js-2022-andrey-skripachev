import { AnimeDto, AnimeStatusDto, AnimeTypeDto } from "./anime.dto";
import { DateTimeRangeDto } from "./date-time-range.dto";
import { GenreDto } from "./genre.dto";
import { StudioDto } from "./studio.dto";

export interface AnimeDetailsRequestDto {
  readonly trailer_youtube_id?: string;
  readonly synopsis: string;
  readonly airing: boolean;
  readonly studios: readonly number[];
  readonly genres: readonly number[];
  readonly aired: DateTimeRangeDto;
  readonly image: string;
  readonly status: AnimeStatusDto;
  readonly title_eng: string;
  readonly title_jpn: string;
  readonly type: AnimeTypeDto;
}

export interface AnimeDetailsDto extends AnimeDto {
  readonly trailer_youtube_id?: string;
  readonly synopsis: string;
  readonly airing: boolean;
  readonly studios: readonly number[];
  readonly genres: readonly number[];
  readonly studios_data: readonly StudioDto[];
  readonly genres_data: readonly GenreDto[];
}
