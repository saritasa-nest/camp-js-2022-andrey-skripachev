interface Aired {

  /**
   * Start: date of start anime serial.
   */
  start: string | Date;

  /**
   * End: date of end anime serial.
   */
  end: string | Date;
}

interface Anime {

  /**
   * Aired: dates of start and end of anime serial.
   */
  aired: Aired;

  /**
   * Created: date of creating anime in DB.
   */
  created: string | Date;

  /**
   * ID: id of anime serial.
   */
  id: number;

  /**
   * Image: anime serial illustration.
   */
  image: string;

  /**
   * Modified: date of last modifying of anime serial.
   */
  modified: string | Date;

  /**
   * Status: 
   */
  status: string;
  title_eng: string;
  title_jpn: string;
  type: string;
}

export interface AnimeData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Anime[];
}

export interface AnimeRequestData {
  count: number;
  results: Anime[];
  offset: number;
  limit: number;
}
