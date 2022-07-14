import { Status, Type } from '@js-camp/core/utils/types/anime';

import { LIMIT, PaginationElements, SortingElements } from '../../scripts/variables/constants';
import { placeAnimeListToTable } from '../../scripts/UI/table';
import { SortingSelector } from '../../scripts/variables/interfaces';
import { PaginationElement } from '../../scripts/UI/pagination';
import { Api } from '../../scripts/api/api';
import { SortingElement } from '../../scripts/UI/sorting';
import { RequestCalculationData } from '../../scripts/api/requestCalculation';
import { Filtering } from '../../scripts/UI/filtering';

/**
 * Initializes the application: Initializing the anime table view and pagination.
 */
function initializeApp(): void {

  const searchParams = new URLSearchParams();
  searchParams.set('offset', '0');
  searchParams.set('limit', LIMIT.toString());
  searchParams.set('ordering', 'id');

  const sortingSelector: SortingSelector = {
    elements: SortingElements.ELEMENT,
    direction: SortingElements.DIRECTION,
    selected: SortingElements.SELECTED_FIELD,
  };
  const filteringByTypeSelect = '.filtering-by-type';
  const filteringByStatusSelect = '.filtering-by-status';

  const filteringByType = new Filtering(
    filteringByTypeSelect,
    Type,
    (newType: string): void => {
      searchParams.set('type', newType);
      searchParams.set('offset', '0');
      updateApp(searchParams, paginationElement);
    },
  );
  filteringByType.initialize();

  const filteringByStatus = new Filtering(
    filteringByStatusSelect,
    Status,
    (newStatus: string): void => {
      searchParams.set('status', newStatus);
      searchParams.set('offset', '0');
      updateApp(searchParams, paginationElement);
    },
  );
  filteringByStatus.initialize();

  const paginationElement = new PaginationElement({
    pagination: document.querySelector(`.${PaginationElements.BLOCK}`),
    buttonNext: document.querySelector(`.${PaginationElements.BUTTON_NEXT}`),
    buttonPrevious: document.querySelector(`.${PaginationElements.BUTTON_PREVIOUS}`),
    buttonSelected: PaginationElements.BUTTON_SELECTED,
    buttonNotSelected: PaginationElements.BUTTON_NOT_SELECTED,
    changePage(newPage: number): void {
      const newOffset = RequestCalculationData.offset(newPage, LIMIT);
      searchParams.set('offset', newOffset.toString());
      updateApp(searchParams, paginationElement);
    },
  });
  paginationElement.initialize();

  const sorting = new SortingElement(
    sortingSelector,
    (newOrdering: string): void => {
      searchParams.set('ordering', `${newOrdering},id`);
      searchParams.set('offset', '0');
      updateApp(searchParams, paginationElement);
    },
  );
  sorting.initialize();

  updateApp(searchParams, paginationElement);
}

/**
 * Updates the pagination and the table.
 * @param searchParams Parameters of the request.
 * @param paginationElement Pagination.
 */
async function updateApp(
  searchParams: URLSearchParams,
  paginationElement: PaginationElement,
): Promise<void> {
  const pagination = await Api.animeApi.getPagination(searchParams);

  paginationElement.update({
    currentPage: Math.floor(Number(searchParams.get('offset')) / LIMIT),
    totalPages: Math.ceil(pagination.count / LIMIT),
  });

  const offset = Number(searchParams.get('offset'));

  placeAnimeListToTable({
    positionInfo: `${offset + 1}-${Math.min(offset + LIMIT + 1, pagination.count)} of ${pagination.count}`,
    results: pagination.results,
  });
}

initializeApp();
