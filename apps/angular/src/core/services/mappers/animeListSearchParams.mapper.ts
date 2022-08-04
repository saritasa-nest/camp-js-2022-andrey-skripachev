import { AnimeListSearchParams } from '../../models/animeListSearchParams';

import { AnimeListSearchParamsDto } from './dto/animeListSearchParams.dto';

export namespace AnimeListSearchParamsMapper {

  /**
   * Maps model to dto.
   * @param model Search params model.
   */
  export function toDto(model: AnimeListSearchParams): AnimeListSearchParamsDto {
    const { pageNumber, maximumItemsOnPage, sorting } = model;

    return {
      limit: maximumItemsOnPage,
      offset: pageNumber * maximumItemsOnPage,
      ordering: sorting,
    };
  }
}
