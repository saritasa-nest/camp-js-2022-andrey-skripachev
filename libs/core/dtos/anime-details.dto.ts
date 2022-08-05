import { AnimeRatingDto, AnimeSourceDto, AnimeStatusDto, AnimeTypeDto } from "./anime.dto";
import { DateTimeRangeDto } from "./date-time-range.dto";

export interface AnimeDetails {
  readonly id: number;
  readonly image?: string;
  readonly trailer_youtube_id?: string;
  readonly title_eng: string;
  readonly title_jpn: string;
  readonly type: AnimeTypeDto;
  readonly status: AnimeStatusDto;
  readonly source: AnimeSourceDto;
  readonly airing: boolean;
  readonly aired: DateTimeRangeDto;
  readonly rating: AnimeRatingDto;
}
