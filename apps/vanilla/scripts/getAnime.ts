import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { AnimeData } from '@js-camp/core/dtos/anime.dto';

import { AnimeDataFromDto, AnimeRequestData, RequestConstructionData } from './variables/interfaces';

import { httpClient } from './api/client';

/**
 * Receives data from the server by offset and limit.
 * @param offset Offset to get the first item in the anime list.
 * @param limit Maximum number of received anime.
 * @param ordering The subject of sorting.
 * @returns Total number of anime series and some anime.
 */
async function getAnimeData({ page, limit, ordering }: RequestConstructionData): Promise<AnimeDataFromDto> {
  const offset = page * limit;
  const urlSearchParameters = `anime/anime/?limit=${limit}&offset=${offset}&ordering=${ordering},id`;

  const response = await httpClient.get<AnimeData>(urlSearchParameters);

  const { results, count } = response.data;

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
export async function getAnimeRequestData(requestConstruction: RequestConstructionData): Promise<AnimeRequestData> {
  const { page, limit } = requestConstruction;
  const offset = page * limit;
  const { count, results } = await getAnimeData(requestConstruction);
  const animeReqData: AnimeRequestData = { count, results, offset, limit };

  return animeReqData;
}
