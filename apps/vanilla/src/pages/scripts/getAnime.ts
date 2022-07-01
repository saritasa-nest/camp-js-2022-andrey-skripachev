import { AnimeModel } from '@js-camp/core/mappers/anime.mapper';

import { AnimeData, AnimeDataFromDto } from './interfaces';

/**
 * Receiving data from the server by offset and limit.
 * @param offset Offset to get the first item in the anime list.
 * @param limit Maximum number of received anime.
 * @param ordering Qwe.
 * @returns
 */
export async function getAnimeData(offset: number, limit: number, ordering: string): Promise<AnimeDataFromDto> {
  const URL = `https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?limit=${limit}&offset=${offset}&ordering=${ordering},id`;
  const { apiKey } = ENV;
  const { count, results }: AnimeData = await fetch(URL, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Api-Key': apiKey,
    },
  }).then(res => res.json());

  const fromDtoResults = results.map(anime => AnimeModel.fromDto(anime));

  return { count, results: fromDtoResults };
}
