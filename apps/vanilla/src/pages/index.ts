import { LIMIT } from './scripts/constants';
import { placeAnimeListToTable } from './scripts/putAnimeToTable';
import { getAnimeData } from './scripts/getAnime';
import { AnimeDataFromDto, AnimeRequestData } from './scripts/interfaces';
import { initializePagination, updatePagination } from './scripts/pagination';
import { initializeSorting } from './scripts/initSort';

/**
 * Getting anime series by page number and incoming anime limit.
 * @param page Page number.
 * @param limit Maximum number of received anime series.
 * @param ordering Field.
 * @param addition A.
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

  const animeTableBlock = <HTMLTableElement>document.querySelector('#anime-table');
  const animeTableCaption = animeTableBlock?.querySelector('#anime-page--data');

  if (!animeTableBlock || !animeTableCaption) {
    return;
  }

  const paginationBlock = document.querySelector('#compressed-pagination');
  const paginationBtnPrev = <HTMLButtonElement>document.querySelector('#pagination-controls .left button');
  const paginationBtnNext = <HTMLButtonElement>document.querySelector('#pagination-controls .right button');

  if (!paginationBlock || !paginationBtnPrev || !paginationBtnNext) {
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

  const sortingBlocks = document.querySelectorAll('table .sort');

  initializeSorting(sortingBlocks, updateOrdering);
  update();
}

initializeApp();
