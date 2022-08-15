import { Anime } from './anime';
import { Genre } from './genre';
import { OmitImmerable } from './immerable';
import { Studio } from './studio';

/** Anime details. */
export class AnimeDetails extends Anime {

  /** ID of the trailer on YouTube. */
  public readonly trailerYoutubeId?: string;

  /** Synopsis. */
  public readonly synopsis: string;

  /** Is anime airing. */
  public readonly isAiring: boolean;

  /** List of ID of the studios. */
  public readonly studiosIdList: readonly number[];

  /** Genres id list. */

  /** List of ID of the genres. */
  public readonly genresIdList: readonly number[];

  /** Studios data. */

  /** List of the studios. */
  public readonly studiosData: readonly Studio[];

  /** List of the genres. */
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
