import { AnimeSeriesDto } from './animeSeries.dto';

/** The structure of the received anime series.*/
export interface AnimeDto {

  /** Total number of anime series.*/
  readonly count: number;

  /** List of anime received on request.*/
  readonly results: readonly AnimeSeriesDto[];
}
