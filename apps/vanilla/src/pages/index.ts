import { LIMIT, AnimeSelector, PaginationSelector, SortingSelector } from '../../scripts/constants';
import { placeAnimeListToTable } from '../../scripts/putAnimeToTable';
import { getAnimeRequestData } from '../../scripts/getAnime';
import { AnimeRequestData, Pagination, RequestConstructionData } from '../../scripts/interfaces';
import { initializePagination, updatePagination } from '../../scripts/pagination';
import { initializeSorting } from '../../scripts/initSort';

/**
 * Initializes the application: Initializing the anime table view and pagination.
 */
function initializeApp(): void {
  let totalPages: number;
  let animeRequestData: AnimeRequestData;

  const requestConstruction: RequestConstructionData = {
    page: 0,
    limit: LIMIT,
    ordering: 'id',
  };

  const pagination: Pagination = {
    blockSelector: PaginationSelector.BLOCK,
    buttonPreviousSelector: PaginationSelector.BUTTON_PREVIOUS,
    buttonNextSelector: PaginationSelector.BUTTON_NEXT,
  };

  /**
   * Updates app.
   */
  async function update(): Promise<void> {
    animeRequestData = await getAnimeRequestData(requestConstruction);
    totalPages = Math.ceil(animeRequestData.count / LIMIT);

    placeAnimeListToTable(AnimeSelector.TABLE_BODY, AnimeSelector.CAPTION, animeRequestData);
    updatePagination(requestConstruction.page, totalPages, pagination);
  }

  initializePagination(
    pagination,
    (pageNumber: number): void => {
      if (pageNumber !== requestConstruction.page) {
        requestConstruction.page = pageNumber;
        update();
      }
    },
  );
  initializeSorting(SortingSelector.BLOCK, (newOrdering: string): void => {
    if (requestConstruction.ordering !== newOrdering) {
      requestConstruction.ordering = newOrdering;
      requestConstruction.page = 0;
      update();
    }
  });

  update();
}

initializeApp();
