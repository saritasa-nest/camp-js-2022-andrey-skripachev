import { LIMIT, AnimeSelector, PaginationElements, SortingElements } from '../../scripts/variables/constants';
import { placeAnimeListToTable } from '../../scripts/putAnimeToTable';
import { PaginationSelector, RequestParameter } from '../../scripts/variables/interfaces';
import { initializePagination, updatePagination } from '../../scripts/pagination';

import { Api } from '../../scripts/api/api';
import { initializeSorting } from '../../scripts/initSort';

function changePagination() {
  const paginationSelector: PaginationSelector = {
    block: PaginationElements.BLOCK,
    buttonPrevious: PaginationElements.BUTTON_PREVIOUS,
    buttonNext: PaginationElements.BUTTON_NEXT,
  };

  const pagination = Api.AnimeApi.getPagination();
  updatePagination(pagination, paginationSelector);
}

function changeAnimeTable() {
  const animeTable = Api.AnimeApi.getAnimeTable();
  placeAnimeListToTable(AnimeSelector.TABLE_BODY, AnimeSelector.CAPTION, animeTable);
}

async function changeApp(requestParameters: readonly Array<RequestParameter>): Promise<void> {
  await Api.AnimeApi.collectAnime(requestParameters);

  changePagination();
  changeAnimeTable();
}

/**
 * Initializes the application: Initializing the anime table view and pagination.
 */
function initializeApp(): void {

  const requestParameters: Array<RequestParameter> = [
    { name: 'offset', value: 0 },
    { name: 'limit', value: LIMIT },
    { name: 'ordering', value: 'id' },
  ];

  const paginationSelector: PaginationSelector = {
    block: PaginationElements.BLOCK,
    buttonPrevious: PaginationElements.BUTTON_PREVIOUS,
    buttonNext: PaginationElements.BUTTON_NEXT,
  };

  initializePagination(
    paginationSelector,
    (newPage: number): void => {
      const offsetOption = requestParameters.find(({ name }) => name === 'offset');
      if (offsetOption === undefined) {
        return;
      }
      const newOffset = newPage * LIMIT;
      offsetOption.value = newOffset;
      const newOffsetOption = { ...offsetOption, value: newOffset };
      
      changeApp(requestParameters);
    },
  );

  initializeSorting(
    SortingElements.BLOCK,
    (newOrdering: string): void => {
      const orderingOption = requestParameters.find(({ name }) => name === 'ordering');
      if (orderingOption === undefined) {
        return;
      }
      orderingOption.value = `${newOrdering},id`;
      changeApp(requestParameters);
    },
  );

  changeApp(requestParameters);
}

initializeApp();
