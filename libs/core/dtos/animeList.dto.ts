import { AnimeDto } from './anime.dto';

/** The structure of the received anime.*/
export interface AnimeListDto {

  /** Total number of anime.*/
  readonly count: number;

  /** List of anime received on request.*/
  readonly results: readonly AnimeDto[];
}
