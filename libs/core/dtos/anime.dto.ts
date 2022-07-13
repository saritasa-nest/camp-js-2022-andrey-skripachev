import { Status, Type } from '../utils/types/anime';

import { AiredDto } from './aired.dto';

/** Anime data from the server. */
export interface AnimeDto {

  /** Anime start and end dates. */
  readonly aired: AiredDto;

  /** Anime ID. */
  readonly id: number;

  /** Image link to the anime. */
  readonly image: string;

  /** Status of anime(Finished, Airing, Yet not aired). */
  readonly status: keyof Status;

  /** Anime name in English. */
  readonly title_eng: string;

  /** Anime name in Japanese. */
  readonly title_jpn: string;

  /** Type of anime (OVA, TV etc). */
  readonly type: keyof Type;
}
