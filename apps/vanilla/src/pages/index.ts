import { placeAnimeListToTable } from './scripts/putAnimeToTable';
import { getAnimeData } from './scripts/getAnime';
import { AnimeData, AnimeRequestData } from './scripts/interfaces';
import { initializePagination, updatePagination } from './scripts/pagination';

/**
 * Getting anime series by page number and incoming anime limit.
 * @param page Page number.
 * @param limit Maximum number of received anime series.
 * @returns Data on request (total number of anime, anime received, offset, limit).
 */
async function getAnimeRequestData(page: number, limit: number): Promise<AnimeRequestData> {
  const offset = page * limit;
  const { count, results }: AnimeData = await getAnimeData(offset, limit);
  const animeReqData: AnimeRequestData = { count, results, offset, limit };

  return animeReqData;
}

/**
 * Initializing the application: Initializing the anime table view and pagination.
 */
async function initializeApp(): Promise<void> {
  const LIMIT = 10;
  let currentPage = 0;

  const animeTableBlock = <HTMLTableElement>document.querySelector('#anime-table');
  const animeTableCaption = animeTableBlock?.querySelector('#anime-page--data');

  if (!animeTableBlock || !animeTableCaption) {
    return;
  }

  let animeReqData = await getAnimeRequestData(currentPage, LIMIT);
  let totalPages = Math.ceil(animeReqData.count / LIMIT);

  placeAnimeListToTable(animeTableBlock, animeTableCaption, animeReqData);

  const paginationBlock = document.querySelector('#compressed-pagination');
  const paginationBtnPrev = <HTMLButtonElement>document.querySelector('#pagination-controls .left button');
  const paginationBtnNext = <HTMLButtonElement>document.querySelector('#pagination-controls .right button');

  if (!paginationBlock || !paginationBtnPrev || !paginationBtnNext) {
    return;
  }

  initializePagination(paginationBlock, paginationBtnPrev, paginationBtnNext, async(page: number) => {
    if (page !== currentPage && page >= 0 && page < totalPages) {
      currentPage = page;
      await getAnimeRequestData(currentPage, LIMIT).then(data => {
        animeReqData = data;
        totalPages = Math.ceil(data.count / LIMIT);
      });
      placeAnimeListToTable(animeTableBlock, animeTableCaption, animeReqData);
      updatePagination(currentPage, totalPages, paginationBlock, paginationBtnPrev, paginationBtnNext);
    }
  });

  updatePagination(currentPage, totalPages, paginationBlock, paginationBtnPrev, paginationBtnNext);
}

initializeApp();
