import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { Anime } from '@js-camp/core/models/anime';

/**
 * The structure of the received anime series.
 */
export interface AnimeData {

  /**
   * Count: total number of anime series.
   */
  count: number;

  /**
   * Next: next request page.
   */
  next: string | null;

  /**
   * Previous: previous request page.
   */
  previous: string | null;

  /**
   * Results: list of anime received on request.
   */
  results: AnimeDto[];
}

/**
 * Request data.
 */
export interface AnimeRequestData {

  /**
   * Count: Total number of anime series.
   */
  count: number;

  /**
   * Results: list of anime received on request.
   */
  results: Anime[];

  /**
   * Offset: offset on request.
   */
  offset: number;

  /**
   * Limit: maximum number of received anime series.
   */
  limit: number;
}

export interface AnimeDataFromDto {
  count: number;
  results: Anime[];
}
