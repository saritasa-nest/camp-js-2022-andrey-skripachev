import { AnimeStatus, AnimeType } from '../utils/types/anime';

import { DateTimeRange } from './dateTimeRange';
import { Genre } from './genre';
import { Immerable, OmitImmerable } from './immerable';
import { Studio } from './studio';

/** Anime detailed info. */
export class AnimeDetails extends Immerable {

  /** Aired start / end. */
  public readonly aired: DateTimeRange;

  /** Anime id. */
  public readonly id: number;

  /** Anime image. */
  public readonly image: string;

  /** Anime status. */
  public readonly status: AnimeStatus;

  /** Anime title in English. */
  public readonly titleEnglish: string;

  /** Anime title in Japanese. */
  public readonly titleJapanese: string;

  /** Anime type. */
  public readonly type: AnimeType;

  /** Anime synopsis. */
  public readonly synopsis: string;

  /** Is anime airing. */
  public readonly airing: boolean;

  /** Anime studios. */
  public readonly studios: Studio[];

  /** Anime genres. */
  public readonly genres: Genre[];

  public constructor(data: InitArgs) {
    super();
    this.aired = data.aired;
    this.id = data.id;
    this.image = data.image;
    this.status = data.status;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.type = data.type;
    this.synopsis = data.synopsis;
    this.airing = data.airing;
    this.studios = data.studios;
    this.genres = data.genres;
  }
}

type InitArgs = OmitImmerable<AnimeDetails>;
