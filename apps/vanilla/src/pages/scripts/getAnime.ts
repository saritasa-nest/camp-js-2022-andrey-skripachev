import { AnimeData } from './interfaces';

export async function getAnimeData(offset: number, limit: number): Promise<AnimeData> {
  const URL = `https://api.camp-js.saritasa.rocks/api/v1/anime/anime/?limit=${limit}&offset=${offset}&ordering=id`;

  const animeData: AnimeData = await fetch(URL, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Api-Key': 'a842f444-64aa-457f-a915-500956ef78fb',
      'Cookie': 'sessionid=a842f444-64aa-457f-a915-500956ef78fb',
    },
  }).then(res => res.json());
  return animeData;
}
