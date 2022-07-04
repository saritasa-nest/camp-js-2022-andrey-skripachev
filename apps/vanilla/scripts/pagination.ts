import { DISABLED } from './constants';

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

/**
 * Creates a list of pagination bar elements.
 * @param currentPage The currently selected page of the application.
 * @param totalPages Total number of pages.
 * @param range How many pagination buttons will be created around the button for the current page.
 * @returns List of HTML elements that will be in the pagination bar.
 */
function createCompressedPagination(currentPage: number, totalPages: number, range: number): Element[] {
  const elementList: Element[] = [];

  const separator = document.createElement('span');
  separator.textContent = '...';

  if (currentPage - range > 0) {
    elementList.push(createPaginationButton(0, currentPage === 0));
  }
  if (currentPage - range > 1) {
    elementList.push(separator.cloneNode(true) as Element);
  }

  for (let i = Math.max(0, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
    elementList.push(createPaginationButton(i, currentPage === i));
  }

  if (currentPage + range < totalPages - 2) {
    elementList.push(separator.cloneNode(true) as Element);
  }
  if (currentPage + range < totalPages - 1) {
    elementList.push(createPaginationButton(totalPages - 1, currentPage === totalPages - 1));
  }

  return elementList;
}

/**
 * Hinges event handlers on blocks.
 * @param paginationBlock The block in which the pagination buttons will be placed.
 * @param buttonPrevious Button to go to the previous page.
 * @param buttonNext Button to go to the next page.
 * @param callback Function executed by pressing the pagination button.
 */
export function initializePagination(
  paginationBlock: Element,
  buttonPrevious: Element,
  buttonNext: Element,
  callback: (page: number) => void,
): void {
  (paginationBlock as HTMLButtonElement).onclick = e => {
    const target = <Element | HTMLButtonElement>e.target;
    const paginationButtons = paginationBlock?.querySelectorAll('button');
    paginationButtons?.forEach(element => {
      if (target === element) {
        callback(parseInt(element.dataset.page ?? '', 10));
      }
    });
  };

  (buttonPrevious as HTMLButtonElement).onclick = e => {
    const target = <HTMLButtonElement>e.target;
    if (target.dataset.page) {
      callback(parseInt(target.dataset.page ?? '', 10));
    }
  };

  (buttonNext as HTMLButtonElement).onclick = e => {
    const target = <HTMLButtonElement>e.target;
    if (target.dataset.page) {
      callback(parseInt(target.dataset.page ?? '', 10));
    }
  };
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
 * Updates buttons and button datasets in the pagination panel.
 * @param currPage Current page number.
 * @param totalPages Total number of pages.
 * @param paginationBlock The block in which the pagination buttons are located.
 * @param btnPrev Button to go to the previous page.
 * @param btnNext Button to go to the next page.
 */
export function updatePagination(
  currPage: number,
  totalPages: number,
  paginationBlock: Element,
  btnPrev: HTMLButtonElement,
  btnNext: HTMLButtonElement,
): void {
  const RANGE = 2;
  btnPrev.dataset.page = (currPage - 1).toString();
  changeDisabled(currPage === 0, btnPrev);

  btnNext.dataset.page = (currPage + 1).toString();
  changeDisabled(currPage === totalPages - 1, btnNext);

  paginationBlock.innerHTML = '';

  const compPagination: Element[] = createCompressedPagination(currPage, totalPages, RANGE);
  paginationBlock.append(...compPagination);
}
