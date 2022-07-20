import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeDetailsDto } from '@js-camp/core/dtos/animeDetails.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/animeDetails.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeDetails } from '@js-camp/core/models/animeDetails';
import { Pagination } from '@js-camp/core/models/pagination';

import { ACCESS } from '../variables/constants/user';

import { httpClient } from './client';

/** Getting anime data. */
export class AnimeApi {
  public constructor(
    private readonly requestBaseUrl: string,
  ) {}

  /**
   * @param parameters Query options.
   * @returns Pagination with a list of anime.
   */
  public async getPagination(parameters: URLSearchParams): Promise<Pagination<Anime>> {
    const url = `${this.requestBaseUrl}?${parameters.toString()}`;
    const request = await httpClient.get<PaginationDto<AnimeDto>>(url);

    const response = request.data;

    const pagination = PaginationMapper.fromDto<AnimeDto, Anime>(response, AnimeMapper.fromDto);

    return pagination;
  }

  /**
   * Gets detailed information about the anime.
   * @param animeId Anime id.
   */
  public async getDetailedAnime(animeId = '0'): Promise<AnimeDetails> {
    const url = `anime/anime/${animeId}/`;

    const request = await httpClient.get<AnimeDetailsDto>(url, {
      headers: {
        ...this.createAuthHeader(),
      },
    });

    const response = request.data;

    const anime = AnimeDetailsMapper.fromDto(response);

    return anime;
  }

  private createAuthHeader(): {} {
    const auth = 'Authorization';
    return {
      [auth]: `Bearer ${localStorage.getItem(ACCESS) ?? ''}`,
    };
  }
}
