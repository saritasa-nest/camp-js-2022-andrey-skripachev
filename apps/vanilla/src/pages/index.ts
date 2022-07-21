import { PaginationElements } from '../../scripts/variables/constants/pagination';
import { SortingElements } from '../../scripts/variables/constants/sorting';
import { placeAnimeListToTable } from '../../scripts/UI/table';
import { PaginationController } from '../../scripts/UI/pagination';
import { SortingController } from '../../scripts/UI/sorting';
import { QueryParamsService } from '../../scripts/domain/queryParamsService';

import '../../scripts/UI/pageNavigation';

/**
 * Initializes the application: Initializing the anime table view and pagination.
 */
function initializeApp(): void {

  const queryParamsService = QueryParamsService.getInstance();
  queryParamsService.setPage(0);

  const paginationElement = new PaginationController({
    pagination: `.${PaginationElements.BLOCK}`,
    buttonNext: `.${PaginationElements.BUTTON_NEXT}`,
    buttonPrevious: `.${PaginationElements.BUTTON_PREVIOUS}`,
    buttonSelected: PaginationElements.BUTTON_SELECTED,
    buttonNotSelected: PaginationElements.BUTTON_NOT_SELECTED,
    changePage(newPage: number): void {
      queryParamsService.setPage(newPage);
      updateApp(queryParamsService, paginationElement);
    },
  });
  paginationElement.initialize();

  const sorting = new SortingController({
    sortingButtons: document.querySelectorAll<HTMLButtonElement>(`.${SortingElements.ELEMENT}`),
    selected: SortingElements.SELECTED_FIELD,
    direction: SortingElements.DIRECTION,
    changeSortField(newTarget: string): void {
      queryParamsService.setSortingTarget(newTarget);
      queryParamsService.setPage(0);
      updateApp(queryParamsService, paginationElement);
    },
  });
  sorting.initialize();

  updateApp(queryParamsService, paginationElement);
}

/**
 * Updates the pagination and the table.
 * @param queryParams Parameters of the request.
 * @param paginationElement Pagination.
 */
async function updateApp(
  queryParams: QueryParamsService,
  paginationElement: PaginationController,
): Promise<void> {
  const pagination = await queryParams.getAnimeList();

  paginationElement.update({
    currentPage: queryParams.getPage(),
    totalPages: queryParams.getTotalPages(pagination.count),
  });

  placeAnimeListToTable({
    results: pagination.results,
  });
}

initializeApp();
