import { RequestPrefix } from '../variables/constants';
import { QueryParameter } from '../variables/interfaces';

import { GetAnimeApi } from './gettingAnime';

export namespace Api {

  /**
   * Creates a URL from the prefix and query parameters.
   * @param baseUrl Part of the request before the parameters.
   * @param parameters Parameters of the request.
   * @returns URL from the prefix and query parameters.
   */
  function createUrl(baseUrl: string, parameters: QueryParameter[]): string {
    let url = baseUrl;
    if (parameters.length !== 0) {
      const options = parameters.map(({ name, value }) => `${name}=${value}`).join('&');
      url += `?${options}`;
    }
    return url;
  }

  export const animeApi = new GetAnimeApi(createUrl, RequestPrefix.ANIME_LIST);
}
