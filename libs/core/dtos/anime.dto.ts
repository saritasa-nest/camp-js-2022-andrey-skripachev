import { AiredDto } from './aired.dto';

/** Anime data from the server. */
export interface AnimeDto {

  /** Anime start and end dates. */
  readonly aired: AiredDto;

  /** Anime ID. */
  readonly id: number;

  /** Image link to the anime. */
  readonly image: string;

  /** Status of anime. */
  readonly status: string;

  /** Anime name in English. */
  readonly title_eng: string;

  /** Anime name in Japanese. */
  readonly title_jpn: string;

  /** Type of anime. */
  readonly type: string;
}
