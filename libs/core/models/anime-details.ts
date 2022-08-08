import { Anime } from "./anime";
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
