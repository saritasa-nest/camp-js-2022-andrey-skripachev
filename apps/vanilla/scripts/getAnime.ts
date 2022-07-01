import { AnimeModel } from '@js-camp/core/mappers/anime.mapper';

import axios from 'axios';

import { AnimeData, AnimeDataFromDto } from './interfaces';

/**
 * Receiving data from the server by offset and limit.
 * @param offset Offset to get the first item in the anime list.
 * @param limit Maximum number of received anime.
 * @param ordering The subject of sorting.
 * @returns
 */
export async function getAnimeData(offset: number, limit: number, ordering: string): Promise<AnimeDataFromDto> {
  const URL = `https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?limit=${limit}&offset=${offset}&ordering=${ordering},id`;
  const { apiKey } = ENV;

  const { count, results }: AnimeData = await axios.get(URL, {
    headers: {
      'Api-Key': apiKey,
    },
  });

  const fromDtoResults = results.map(anime => AnimeModel.fromDto(anime));

  return { count, results: fromDtoResults };
}
