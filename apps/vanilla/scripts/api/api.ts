import { AnimeApi } from './anime';
import { UserApi } from './user';

/** Receiving and sending data to the API. */
export namespace Api {

  export const animeApi = new AnimeApi('anime/anime/');

  export const userApi = new UserApi();
}
