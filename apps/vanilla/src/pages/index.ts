import { RECEIVE_LIMIT } from '../../scripts/variables/constants/global';
import { PaginationElements } from '../../scripts/variables/constants/pagination';
import { SortingElements } from '../../scripts/variables/constants/sorting';
import { placeAnimeListToTable } from '../../scripts/UI/table';
import { PaginationElement } from '../../scripts/UI/pagination';
import { Api } from '../../scripts/api/api';
import { SortingElement } from '../../scripts/UI/sorting';
import { changeHeader } from '../../scripts/UI/header';

import '../../scripts/UI/pageNavigation';

/**
 * Initializes the application: Initializing the anime table view and pagination.
 */
function initializeApp(): void {

  const searchParams = new URLSearchParams();
  searchParams.set('offset', '0');
  searchParams.set('limit', RECEIVE_LIMIT.toString());
  searchParams.set('ordering', 'id');

  const paginationElement = new PaginationElement({
    pagination: document.querySelector(`.${PaginationElements.BLOCK}`),
    buttonNext: document.querySelector(`.${PaginationElements.BUTTON_NEXT}`),
    buttonPrevious: document.querySelector(`.${PaginationElements.BUTTON_PREVIOUS}`),
    buttonSelected: PaginationElements.BUTTON_SELECTED,
    buttonNotSelected: PaginationElements.BUTTON_NOT_SELECTED,
    changePage(newPage: number): void {
      const newOffset = newPage * RECEIVE_LIMIT;
      searchParams.set('offset', newOffset.toString());
      updateApp(searchParams, paginationElement);
    },
  });
  paginationElement.initialize();

  const sorting = new SortingElement({
    sortingButtons: document.querySelectorAll<HTMLButtonElement>(`.${SortingElements.ELEMENT}`),
    selected: SortingElements.SELECTED_FIELD,
    direction: SortingElements.DIRECTION,
    changeSortField(newOrdering: string): void {
      searchParams.set('ordering', `${newOrdering},id`);
      searchParams.set('offset', '0');
      updateApp(searchParams, paginationElement);
    },
  });
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
    currentPage: Math.floor(Number(searchParams.get('offset')) / RECEIVE_LIMIT),
    totalPages: Math.ceil(pagination.count / RECEIVE_LIMIT),
  });

  const offset = Number(searchParams.get('offset'));

  placeAnimeListToTable({
    firstElement: offset + 1,
    lastElement: Math.min(offset + RECEIVE_LIMIT + 1, pagination.count),
    totalElements: pagination.count,
    results: pagination.results,
  });
}

initializeApp();
changeHeader(
  'header__user-register',
  'header__user-unregister',
  'header__userinfo',
);
