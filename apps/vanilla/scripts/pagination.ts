import { Pagination } from '@js-camp/core/models/pagination';

import { DISABLED, RANGE, PaginationElements } from './variables/constants';

import { PaginationSelector } from './variables/interfaces';

/**
 * Hinges event handlers on blocks.
 * @param pagination A.
 * @param callback Function executed by pressing the pagination button.
 */
export function initializePagination(
  pagination: PaginationSelector,
  callback: (page: number) => void,
): void {
  const paginationBlock = document.querySelector<HTMLDivElement>(pagination.block);
  const buttonPrevious = document.querySelector<HTMLButtonElement>(pagination.buttonPrevious);
  const buttonNext = document.querySelector<HTMLButtonElement>(pagination.buttonNext);
  const { BUTTON_SELECTED } = PaginationElements;
  if (paginationBlock === null || buttonPrevious === null || buttonNext === null) {
    return;
  }

  paginationBlock.onclick = event => {
    const { target } = event;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    if (!(target.classList.contains(BUTTON_SELECTED))) {
      callback(Number(target.dataset.page));
    }

  };

  buttonPrevious.onclick = event => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const { target } = event;

    if (target.dataset.page && !(target.classList.contains(BUTTON_SELECTED))) {
      callback(Number(target.dataset.page));
    }
  };

  buttonNext.onclick = event => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const { target } = event;

    if (target.dataset.page && !(target.classList.contains(BUTTON_SELECTED))) {
      callback(Number(target.dataset.page));
    }
  };
}

/**
 * Updates buttons and button datasets in the pagination panel.
 * @param pagination A.
 */
export function updatePagination(
  { currentPage, totalPages }: Pagination,
  pagination: PaginationSelector,
): void {
  const paginationBlock = document.querySelector<HTMLDivElement>(pagination.block);
  const buttonPrevious = document.querySelector<HTMLButtonElement>(pagination.buttonPrevious);
  const buttonNext = document.querySelector<HTMLButtonElement>(pagination.buttonNext);

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
    button.setAttribute(DISABLED, DISABLED);
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
  const { BUTTON_SELECTED, BUTTON_NOT_SELECTED } = PaginationElements;

  const button = document.createElement('button');
  button.textContent = (page + 1).toString();
  button.setAttribute('type', 'button');
  button.dataset.page = page.toString();
  button.classList.add('btn-flat', 'teal', 'pagination-button', isSelected ? BUTTON_SELECTED : BUTTON_NOT_SELECTED);
  return button;
}
