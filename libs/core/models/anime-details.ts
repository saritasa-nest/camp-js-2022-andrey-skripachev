import { Anime } from './anime';
import { Genre } from './genre';
import { OmitImmerable } from './immerable';
import { Studio } from './studio';

/** Anime details. */
export class AnimeDetails extends Anime {

  /** YouTube trailer id. */
  public readonly trailerYoutubeId?: string;

  /** Synopsis. */
  public readonly synopsis: string;

  /** Is anime airing. */
  public readonly isAiring: boolean;

  /** Studios id list. */
  public readonly studiosIdList: readonly number[];

  /** Genres id list. */
  public readonly genresIdList: readonly number[];

  /** Studios data. */
  public readonly studiosData: readonly Studio[];

  /** Genres data. */
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

type InitArgs = OmitImmerable<AnimeDetails>;
