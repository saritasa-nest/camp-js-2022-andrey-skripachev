import { AiredDto } from './aired.dto';

/** Anime data from the server. */
export interface AnimeDto {

  /** Anime start and end dates. */
  readonly aired: AiredDto;

  /** Date of anime creation in the database. */
  readonly created: string;

  /** Anime ID. */
  readonly id: number;

  /** Image link to the anime. */
  readonly image: string;

  /** Status of anime(Finished, Aired, Yet not aired). */
  readonly status: string;

  /** Anime name in English. */
  readonly title_eng: string;

  /** Anime name in Japanese. */
  readonly title_jpn: string;

  /** Type of anime (OVA, TV etc). */
  readonly type: string;
}

/** The structure of the received anime series.*/
export interface AnimeData {

  /** Total number of anime series.*/
  readonly count: number;

  /** Next request page.*/
  readonly next: string | null;

  /** Previous request page.*/
  readonly previous: string | null;

  /** List of anime received on request.*/
  readonly results: readonly AnimeDto[];
}
