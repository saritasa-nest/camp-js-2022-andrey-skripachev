import { RequestPrefix } from '../variables/constants';

import { AnimeApi } from './anime';

/** Receiving and sending data to the API. */
export namespace Api {

  export const animeApi = new AnimeApi(RequestPrefix.ANIME_LIST);
}
