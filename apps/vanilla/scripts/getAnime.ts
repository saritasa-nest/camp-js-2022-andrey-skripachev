import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { AnimeData } from '@js-camp/core/dtos/anime.dto';

import { AnimeDataFromDto, AnimeRequestData } from './interfaces';

import { client } from './client';

/**
 * Receives data from the server by offset and limit.
 * @param offset Offset to get the first item in the anime list.
 * @param limit Maximum number of received anime.
 * @param ordering The subject of sorting.
 * @returns Total number of anime series and some anime.
 */
async function getAnimeData(offset: number, limit: number, ordering: string): Promise<AnimeDataFromDto> {
  const URL = `anime/anime/?limit=${limit}&offset=${offset}&ordering=${ordering},id`;

  const response = await client.get(URL);

  const { results, count } = response.data as AnimeData;

  const fromDtoResults = results.map(anime => AnimeMapper.fromDto(anime));

  return { count, results: fromDtoResults };
}

/**
 * Gets anime series by page number and incoming anime limit.
 * @param page Page number.
 * @param limit Maximum number of received anime series.
 * @param ordering The subject of sorting.
 * @returns Data on request (total number of anime, anime received, offset, limit).
 */
export async function getAnimeRequestData(page: number, limit: number, ordering: string): Promise<AnimeRequestData> {
  const offset = page * limit;
  const { count, results } = await getAnimeData(offset, limit, ordering);
  const animeReqData: AnimeRequestData = { count, results, offset, limit };

  return animeReqData;
}
