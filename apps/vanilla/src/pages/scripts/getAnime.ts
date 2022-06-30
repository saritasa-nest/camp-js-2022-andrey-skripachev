import { AnimeData } from './interfaces';

/**
 * Receiving data from the server by offset and limit.
 * @param offset Offset to get the first item in the anime list.
 * @param limit Maximum number of received anime.
 * @returns
 */
export async function getAnimeData(offset: number, limit: number): Promise<AnimeData> {
  const URL = `https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?limit=${limit}&offset=${offset}&ordering=id`;
  const apiKey = 'a842f444-64aa-457f-a915-500956ef78fb';

  const animeData: AnimeData = await fetch(URL, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Api-Key': apiKey,
      'Cookie': `sessionid=${apiKey}`,
    },
  }).then(res => res.json());
  return animeData;
}
