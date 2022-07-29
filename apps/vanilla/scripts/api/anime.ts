import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { httpClient } from './client';

/** Getting anime data. */
export class AnimeApi {
  public constructor(
    private readonly requestBaseUrl: string,
  ) {}

  /**
   * Gets pagination with a list of anime.
   * @param parameters Query options.
   */
  public async getPagination(parameters: URLSearchParams): Promise<Pagination<Anime>> {
    const url = `${this.requestBaseUrl}?${parameters.toString()}`;
    const request = await httpClient.get<PaginationDto<AnimeDto>>(url);

    const response = request.data;

    const pagination = PaginationMapper.fromDto<AnimeDto, Anime>(response, AnimeMapper.fromDto);

    return pagination;
  }
}
