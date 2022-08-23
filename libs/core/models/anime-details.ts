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

  /** List of ID of the genres. */
  public readonly genresIdList: readonly number[];

  /** List of the studios. */
  public readonly studiosData: readonly Studio[];

  /** List of the genres. */
  public readonly genresData: readonly Genre[];

  /** Source. */
  public readonly source: string;

  /** Age rating. */
  public readonly rating: string;

  /** Release season. */
  public readonly season: string;

  /** Background. */
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

type InitArgs = OmitImmerable<AnimeDetails>;
