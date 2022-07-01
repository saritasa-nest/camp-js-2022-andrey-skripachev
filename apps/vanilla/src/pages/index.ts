import { LIMIT, ANIME_TABLE_SELECTOR, ANIME_TABLE_CAPTION_SELECTOR, PAGINATION_SELECTOR, PAGINATION_BUTTON_PREV_SELECTOR, PAGINATION_BUTTON_NEXT_SELECTOR, SORTING_BLOCK_SELECTOR } from '../../scripts/constants';
import { placeAnimeListToTable } from '../../scripts/putAnimeToTable';
import { getAnimeData } from '../../scripts/getAnime';
import { AnimeDataFromDto, AnimeRequestData } from '../../scripts/interfaces';
import { initializePagination, updatePagination } from '../../scripts/pagination';
import { initializeSorting } from '../../scripts/initSort';

/**
 * Getting anime series by page number and incoming anime limit.
 * @param page Page number.
 * @param limit Maximum number of received anime series.
 * @param ordering The subject of sorting.
 * @returns Data on request (total number of anime, anime received, offset, limit).
 */
async function getAnimeRequestData(page: number, limit: number, ordering: string): Promise<AnimeRequestData> {
  const offset = page * limit;
  const { count, results }: AnimeDataFromDto = await getAnimeData(offset, limit, ordering);
  const animeReqData: AnimeRequestData = { count, results, offset, limit };

  return animeReqData;
}

/**
 * Initializing the application: Initializing the anime table view and pagination.
 */
function initializeApp(): void {
  let currentPage = 0;
  let totalPages: number;
  let ordering = 'id';
  let animeReqData: AnimeRequestData;

  const animeTableBlock = <HTMLTableElement>document.querySelector(ANIME_TABLE_SELECTOR);
  const animeTableCaption = document.querySelector(ANIME_TABLE_CAPTION_SELECTOR);
  const paginationBlock = document.querySelector(PAGINATION_SELECTOR);
  const paginationBtnPrev = <HTMLButtonElement>document.querySelector(PAGINATION_BUTTON_PREV_SELECTOR);
  const paginationBtnNext = <HTMLButtonElement>document.querySelector(PAGINATION_BUTTON_NEXT_SELECTOR);
  const sortingBlocks = document.querySelectorAll(SORTING_BLOCK_SELECTOR);

  if (
    animeTableBlock === null ||
    animeTableCaption === null ||
    paginationBlock === null ||
    paginationBtnPrev === null ||
    paginationBtnNext === null
  ) {
    return;
  }

  const update = async(): Promise<void> => {
    await getAnimeRequestData(currentPage, LIMIT, ordering).then(data => {
      animeReqData = data;
      totalPages = Math.ceil(data.count / LIMIT);
    });
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
