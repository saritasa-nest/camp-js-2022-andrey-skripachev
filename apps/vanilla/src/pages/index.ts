import { LIMIT, AnimeSelector, PaginationSelector, SortingSelector } from '../../scripts/constants';
import { placeAnimeListToTable } from '../../scripts/putAnimeToTable';
import { getAnimeRequestData } from '../../scripts/getAnime';
import { AnimeRequestData } from '../../scripts/interfaces';
import { initializePagination, updatePagination } from '../../scripts/pagination';
import { initializeSorting } from '../../scripts/initSort';

/**
 * Function initializes the application: Initializing the anime table view and pagination.
 */
function initializeApp(): void {
  let currentPage = 0;
  let totalPages: number;
  let ordering = 'id';
  let animeReqData: AnimeRequestData;

  const animeTableBlock = document.querySelector<HTMLTableElement>(AnimeSelector.TABLE_ID);
  const animeTableCaption = document.querySelector(AnimeSelector.CAPTION_ID);
  const paginationBlock = document.querySelector(PaginationSelector.BLOCK_ID);
  const paginationBtnPrev = document.querySelector<HTMLButtonElement>(PaginationSelector.BUTTON_PREVIOUS);
  const paginationBtnNext = document.querySelector<HTMLButtonElement>(PaginationSelector.BUTTON_NEXT);
  const sortingBlocks = document.querySelectorAll(SortingSelector.BLOCK_ID);

  if (
    animeTableBlock === null ||
    animeTableCaption === null ||
    paginationBlock === null ||
    paginationBtnPrev === null ||
    paginationBtnNext === null
  ) {
    throw new Error();
  }

  const update = async(): Promise<void> => {
    animeReqData = await getAnimeRequestData(currentPage, LIMIT, ordering);
    totalPages = Math.ceil(animeReqData.count / LIMIT);
    placeAnimeListToTable(animeTableBlock, animeTableCaption, animeReqData);
    updatePagination(currentPage, totalPages, paginationBlock, paginationBtnPrev, paginationBtnNext);
  };

  const updatePage = (page: number): void => {
    if (page !== currentPage) {
      currentPage = page;
      update();
    }
  };

  const updateOrdering = (newOrdering: string): void => {
    if (ordering !== newOrdering) {
      ordering = newOrdering;
      currentPage = 0;
      update();
    }
  };

  initializePagination(paginationBlock, paginationBtnPrev, paginationBtnNext, updatePage);
  initializeSorting(sortingBlocks, updateOrdering);

  update();
}

initializeApp();
