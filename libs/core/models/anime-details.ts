import { AnimeStatus } from "../utils/types/animeStatus";
import { AnimeType } from "../utils/types/animeType";
import { Anime } from "./anime";
import { DateTimeRange } from "./date-time-range";
import { Genre } from "./genre";
import { Immerable, OmitImmerable } from "./immerable";
import { Studio } from "./studio";

export interface AnimeDetailsRequest {
  readonly trailerYoutubeId?: string;
  readonly synopsis: string;
  readonly isAiring: boolean;
  readonly studiosIdList: readonly number[];
  readonly genresIdList: readonly number[];
  readonly aired: DateTimeRange;
  readonly image: string;
  readonly status: AnimeStatus;
  readonly titleEnglish: string;
  readonly titleJapanese: string;
  readonly type: AnimeType;
}

export class AnimeDetails extends Anime {
  public readonly trailerYoutubeId?: string;
  public readonly synopsis: string;
  public readonly isAiring: boolean;
  public readonly studiosIdList: readonly number[];
  public readonly genresIdList: readonly number[];
  public readonly studiosData: readonly Studio[];
  public readonly genresData: readonly Genre[];

  public constructor(data: InitArgs) {
    super(data);
    this.trailerYoutubeId = data.trailerYoutubeId;
    this.synopsis = data.synopsis;
    this.isAiring = data.isAiring;
    this.studiosIdList = data.studiosIdList;
    this.genresIdList = data.genresIdList;
    this.studiosData = data.studiosData;
    this.genresData = data.genresData;
  }
}

type InitArgs = OmitImmerable<AnimeDetails>
