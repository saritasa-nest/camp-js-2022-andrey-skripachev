interface Aired {

  /**
   * Start: start date of the anime series.
   */
  start: string;

  /**
   * End: the end date of the anime series.
   */
  end: string;
}

/**
 * Template of data about anime received from the server.
 */
export interface Anime {

  /**
   * Aired: start and end dates of the anime series.
   */
  aired: Aired;

  /**
   * Created: the date the anime series was entered into the database.
   */
  created: string;

  /**
   * ID: anime series id.
   */
  id: number;

  /**
   * Image: picture for the anime series.
   */
  image: string;

  /**
   * Modified: date of the last change of the anime series in the database.
   */
  modified: string;

  /**
   * Status: the degree of completion of the anime series.
   */
  status: string;

  /**
   * Title English: anime title in English.
   */
  title_eng: string;

  /**
   * Title Japanese: anime title in Japanese.
   */
  title_jpn: string;

  /**
   * Type: type of anime (OVA, TV, etc.).
   */
  type: string;
}

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
  results: Anime[];
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
