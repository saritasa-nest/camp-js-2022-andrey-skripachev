import { AnimeStatus } from "../utils/types/animeStatus";
import { AnimeType } from "../utils/types/animeType";
import { Anime } from "./anime";
import { DateTimeRange } from "./date-time-range";
import { Genre } from "./genre";
import { Immerable, OmitImmerable } from "./immerable";
import { Studio } from "./studio";


export class AnimeDetails extends Anime {
  public readonly trailerYoutubeId?: string;
  public readonly synopsis: string;
  public readonly isAiring: boolean;
  public readonly studiosIdList: readonly number[];
  public readonly genresIdList: readonly number[];
  public readonly studiosData: readonly Studio[];
  public readonly genresData: readonly Genre[];
  public readonly source: string;
  public readonly rating: string;
  public readonly season: string;
  public readonly background: string;

  public constructor(data: InitArgs) {
    super(data);
    this.trailerYoutubeId = data.trailerYoutubeId;
    this.synopsis = data.synopsis;
    this.isAiring = data.isAiring;
    this.studiosIdList = data.studiosIdList;
    this.genresIdList = data.genresIdList;
    this.studiosData = data.studiosData;
    this.genresData = data.genresData;
    this.source = data.source;
    this.rating = data.rating;
    this.season = data.season;
    this.background = data.background;
  }
}

type InitArgs = OmitImmerable<AnimeDetails>
