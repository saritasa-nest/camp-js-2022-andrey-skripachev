import { LIMIT, PaginationElements, SortingElements } from '../../scripts/variables/constants';
import { placeAnimeListToTable } from '../../scripts/UI/animeTable';
import { PaginationSelector, SortingSelector } from '../../scripts/variables/interfaces';
import { PaginationElement } from '../../scripts/UI/pagination';
import { Api } from '../../scripts/api/api';
import { SortingElement } from '../../scripts/UI/sorting';
import { RequestCalculationData } from '../../scripts/api/requestCalculation';
import { QueryParameters } from '../../scripts/api/request';

/**
 * Initializes the application: Initializing the anime table view and pagination.
 */
function initializeApp(): void {

  const queryParameters = new QueryParameters([
    { name: 'offset', value: 0 },
    { name: 'limit', value: LIMIT },
    { name: 'ordering', value: 'id' },
  ]);

  const paginationSelector: PaginationSelector = {
    block: PaginationElements.BLOCK,
    buttonPrevious: PaginationElements.BUTTON_PREVIOUS,
    buttonNext: PaginationElements.BUTTON_NEXT,
    button: PaginationElements.BUTTON,
    selectedButton: PaginationElements.BUTTON_SELECTED,
    notSelectedButton: PaginationElements.BUTTON_NOT_SELECTED,
  };
  const sortingSelector: SortingSelector = {
    elements: SortingElements.ELEMENT,
    direction: SortingElements.DIRECTION,
    selected: SortingElements.SELECTED_FIELD,
  };

  const pagination = new PaginationElement(
    paginationSelector,
    (newPage: number): void => {
      const newOffset = RequestCalculationData.offset(newPage, LIMIT);
      queryParameters.replaceOption('offset', newOffset.toString());
      updateApp(queryParameters, pagination);
    },
  );
  pagination.initialize();

  const sorting = new SortingElement(
    sortingSelector,
    (newOrdering: string): void => {
      queryParameters.replaceOption('ordering', `${newOrdering},id`);
      queryParameters.replaceOption('offset', '0');
      updateApp(queryParameters, pagination);
    },
  );
  sorting.initialize();

  updateApp(queryParameters, pagination);
}

/**
 * Updates the pagination and the table.
 * @param queryParameters Parameters of the request.
 * @param pagination Pagination.
 */
async function updateApp(
  queryParameters: QueryParameters,
  pagination: PaginationElement,
): Promise<void> {
  await Api.animeApi.collectAnimeList(queryParameters);

  changePagination(pagination);
  changeAnimeTable();
}

/**
 * Updates the contents of the pagination block.
 * @param pagination Pagination.
 */
function changePagination(pagination: PaginationElement): void {
  const paginationData = Api.animeApi.getPagination();
  pagination.update(paginationData);
}

/**
 * Updates the anime table.
 */
function changeAnimeTable(): void {
  const animeList = Api.animeApi.getAnimeList();
  placeAnimeListToTable(animeList);
}

initializeApp();
