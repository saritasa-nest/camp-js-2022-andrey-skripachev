import { LIMIT, AnimeSelector, PaginationSelector, SortingSelector } from '../../scripts/constants';
import { placeAnimeListToTable } from '../../scripts/putAnimeToTable';
import { getAnimeRequestData } from '../../scripts/getAnime';
import { AnimeRequestData, Pagination } from '../../scripts/interfaces';
import { initializePagination, updatePagination } from '../../scripts/pagination';
import { initializeSorting } from '../../scripts/initSort';

/**
 * Function initializes the application: Initializing the anime table view and pagination.
 */
function initializeApp(): void {
  let currentPage = 0;
  let totalPages: number;
  let ordering = 'id';
  let animeRequestData: AnimeRequestData;

  const pagination: Pagination = {
    blockSelector: PaginationSelector.BLOCK_ID,
    buttonPreviousSelector: PaginationSelector.BUTTON_PREVIOUS,
    buttonNextSelector: PaginationSelector.BUTTON_NEXT,
  };

  /**
   * Updates app.
   */
  async function update(): Promise<void> {
    animeRequestData = await getAnimeRequestData(currentPage, LIMIT, ordering);
    totalPages = Math.ceil(animeRequestData.count / LIMIT);

    placeAnimeListToTable(AnimeSelector.TABLE_BODY_SELECTOR, AnimeSelector.CAPTION_ID, animeRequestData);
    updatePagination(currentPage, totalPages, pagination);
  }

  initializePagination(
    pagination,
    (pageNumber: number): void => {
      if (pageNumber !== currentPage) {
        currentPage = pageNumber;
        update();
      }
    },
  );
  initializeSorting(SortingSelector.BLOCK_ID, (newOrdering: string): void => {
    if (ordering !== newOrdering) {
      ordering = newOrdering;
      currentPage = 0;
      update();
    }
  });

  update();
}

initializeApp();
