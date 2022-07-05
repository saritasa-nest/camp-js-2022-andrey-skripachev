import { DISABLED, RANGE } from './constants';
import { Pagination } from './interfaces';

/**
 * Hinges event handlers on blocks.
 * @param pagination A.
 * @param callback Function executed by pressing the pagination button.
 */
export function initializePagination(
  pagination: Pagination,
  callback: (page: number) => void,
): void {
  const paginationBlock = document.querySelector<HTMLDivElement>(pagination.blockSelector);
  const buttonPrevious = document.querySelector<HTMLButtonElement>(pagination.buttonPreviousSelector);
  const buttonNext = document.querySelector<HTMLButtonElement>(pagination.buttonNextSelector);

  if (paginationBlock === null || buttonPrevious === null || buttonNext === null) {
    return;
  }

  paginationBlock.onclick = event => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const { target } = event;
    const paginationButtons = paginationBlock.querySelectorAll('button');
    paginationButtons.forEach(element => {
      if (target === element) {
        callback(parseInt(element.dataset.page ?? '', 10));
      }
    });
  };

  buttonPrevious.onclick = event => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const { target } = event;
    if (target.dataset.page) {
      callback(parseInt(target.dataset.page ?? '', 10));
    }
  };

  buttonNext.onclick = event => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }
    const { target } = event;
    if (target.dataset.page) {
      callback(parseInt(target.dataset.page ?? '', 10));
    }
  };
}

/**
 * Updates buttons and button datasets in the pagination panel.
 * @param currentPage Current page number.
 * @param totalPages Total number of pages.
 * @param pagination A.
 */
export function updatePagination(
  currentPage: number,
  totalPages: number,
  pagination: Pagination,
): void {
  const paginationBlock = document.querySelector<HTMLDivElement>(pagination.blockSelector);
  const buttonPrevious = document.querySelector<HTMLButtonElement>(pagination.buttonPreviousSelector);
  const buttonNext = document.querySelector<HTMLButtonElement>(pagination.buttonNextSelector);

  if (paginationBlock === null || buttonPrevious === null || buttonNext === null) {
    return;
  }

  buttonPrevious.dataset.page = (currentPage - 1).toString();
  changeDisabled(currentPage === 0, buttonPrevious);

  buttonNext.dataset.page = (currentPage + 1).toString();
  changeDisabled(currentPage === totalPages - 1, buttonNext);

  paginationBlock.innerHTML = '';

  const compPagination = createCompressedPagination(currentPage, totalPages, RANGE);
  paginationBlock.append(...compPagination);
}

/**
 * Locks or unlocks the button.
 * @param condition Button lock condition.
 * @param button Button.
 */
function changeDisabled(condition: boolean, button: HTMLButtonElement): void {
  if (condition) {
    button.setAttribute(DISABLED, '1');
    button.classList.add(DISABLED);
  } else {
    button.removeAttribute(DISABLED);
    button.classList.remove(DISABLED);
  }
}

/**
 * Creates a list of pagination bar elements.
 * @param currentPage The currently selected page of the application.
 * @param totalPages Total number of pages.
 * @param range How many pagination buttons will be created around the button for the current page.
 * @returns List of HTML elements that will be in the pagination bar.
 */
function createCompressedPagination(currentPage: number, totalPages: number, range: number): Array<HTMLButtonElement | HTMLSpanElement> {
  const elementList: (HTMLButtonElement | HTMLSpanElement)[] = [];

  const separator = document.createElement('span');
  separator.textContent = '...';

  if (currentPage - range > 0) {
    elementList.push(createPaginationButton(0, currentPage === 0));
  }
  if (currentPage - range > 1) {
    elementList.push(separator.cloneNode(true) as HTMLSpanElement);
  }

  for (let i = Math.max(0, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
    elementList.push(createPaginationButton(i, currentPage === i));
  }

  if (currentPage + range < totalPages - 2) {
    elementList.push(separator.cloneNode(true) as HTMLSpanElement);
  }
  if (currentPage + range < totalPages - 1) {
    elementList.push(createPaginationButton(totalPages - 1, currentPage === totalPages - 1));
  }

  return elementList;
}

/**
 * Creates a button for the pagination block.
 * @param page Page number that the button stores.
 * @param isSelected Check if the new button is the selected.
 * @returns New button for placing in the pagination.
 */
function createPaginationButton(page: number, isSelected: boolean): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = (page + 1).toString();
  button.setAttribute('type', 'button');
  button.dataset.page = page.toString();
  button.classList.add('btn-flat', 'teal', 'pagination-button', isSelected ? 'lighten-3' : 'lighten-5');
  return button;
}
