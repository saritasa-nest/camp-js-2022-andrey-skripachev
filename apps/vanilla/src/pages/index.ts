import { LIMIT, PaginationElements, SortingElements } from '../../scripts/variables/constants';
import { placeAnimeListToTable } from '../../scripts/UI/animeTable';
import { PaginationSelector, RequestParameter, SortingSelector } from '../../scripts/variables/interfaces';
import { PaginationElement } from '../../scripts/UI/pagination';

import { Api } from '../../scripts/api/api';
import { SortingElement } from '../../scripts/UI/sorting';

/**
 * Initializes the application: Initializing the anime table view and pagination.
 */
function initializeApp(): void {

  let requestParameters: Array<RequestParameter> = [
    { name: 'offset', value: 0 },
    { name: 'limit', value: LIMIT },
    { name: 'ordering', value: 'id' },
  ];

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
      const newOffset = newPage * LIMIT;
      requestParameters = changeParameter(requestParameters, 'offset', newOffset);
      updateApp(requestParameters, pagination);
    },
  );
  pagination.initialize();

  const sorting = new SortingElement(
    sortingSelector,
    (newOrdering: string): void => {
      requestParameters = changeParameter(requestParameters, 'ordering', `${newOrdering},id`);
      requestParameters = changeParameter(requestParameters, 'offset', 0);
      updateApp(requestParameters, pagination);
    },
  );
  sorting.initialize();

  updateApp(requestParameters, pagination);
}

/**
 * Copies the parameters of the request and changes one of these.
 * @param parameters Parameters of the request.
 * @param parameterName Changeable parameter.
 * @param parameterValue New value of a changeable parameter.
 * @returns New request parameters.
 */
function changeParameter(
  parameters: Array<RequestParameter>,
  parameterName: string,
  parameterValue: string | number,
): Array<RequestParameter> {
  const newParameters: Array<RequestParameter> = [];

  for (const parameter of parameters) {
    let newParameter;
    if (parameter.name === parameterName) {
      newParameter = { ...parameter, value: parameterValue };
    } else {
      newParameter = { ...parameter };
    }
    newParameters.push(newParameter);
  }

  return newParameters;
}

/**
 * Updates the pagination and the table.
 * @param requestParameters Parameters of the request.
 * @param pagination Pagination.
 */
async function updateApp(
  requestParameters: Array<RequestParameter>,
  pagination: PaginationElement,
): Promise<void> {
  await Api.AnimeApi.collectAnime(requestParameters);

  changePagination(pagination);
  changeAnimeTable();
}

/**
 * Updates the contents of the pagination block.
 * @param pagination Pagination.
 */
function changePagination(pagination: PaginationElement): void {
  const paginationData = Api.AnimeApi.getPagination();
  pagination.update(paginationData);
}

/**
 * Updates the anime table.
 */
function changeAnimeTable(): void {
  const anime = Api.AnimeApi.getAnimeTable();
  placeAnimeListToTable(anime);
}

initializeApp();
