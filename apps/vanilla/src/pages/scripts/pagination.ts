/**
 * Creates a button for the pagination block.
 * @param page Page number that the button stores.
 * @param isSelected Check if the new button is the selected.
 * @returns New button for placing in the pagination.
 */
function createPaginationButton(page: number, isSelected: boolean): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = (page + 1).toString();
  button.dataset.page = page.toString();
  button.classList.add('btn-flat', 'teal', isSelected ? 'lighten-3' : 'lighten-5');
  return button;
}

/**
 * Checks if the numeric values of the pages are equal.
 * @param page1 Some anime list page.
 * @param page2 Some anime list page.
 * @returns Checks if the numeric values of the pages are equal.
 */
function equal(page1: number, page2: number): boolean {
  return page1 === page2;
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

  const separator = <Element>document.createElement('span');
  separator.textContent = '...';

  if (currentPage - range > 0) {
    elementList.push(<Element>createPaginationButton(0, equal(0, currentPage)));
  }
  if (currentPage - range > 1) {
    elementList.push(<Element>separator.cloneNode(true));
  }

  for (let i = Math.max(0, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
    elementList.push(<Element>createPaginationButton(i, equal(i, currentPage)));
  }

  if (currentPage + range < totalPages - 2) {
    elementList.push(<Element>separator.cloneNode(true));
  }
  if (currentPage + range < totalPages - 1) {
    elementList.push(<Element>createPaginationButton(totalPages - 1, equal(totalPages - 1, currentPage)));
  }

  return elementList;
}

/**
 * Hinges event handlers on blocks.
 * @param paginationBlock The block in which the pagination buttons will be placed.
 * @param buttonPrevious Button to go to the previous page.
 * @param buttonNext Button to go to the next page.
 * @param clickEvt Function executed by pressing the pagination button.
 */
export function initializePagination(
  paginationBlock: Element,
  buttonPrevious: Element,
  buttonNext: Element,
  clickEvt: Function,
): void {
  paginationBlock.addEventListener('click', e => {
    const target = <Element | HTMLButtonElement>e.target;
    const paginationButtons = paginationBlock?.querySelectorAll('button');
    paginationButtons?.forEach(element => {
      if (target === element) {
        clickEvt(parseInt(element.dataset.page ?? '', 10));
      }
    });
  });

  buttonPrevious.addEventListener('click', e => {
    const target = <HTMLButtonElement>e.target;
    if (target.dataset.page) {
      clickEvt(parseInt(target.dataset.page ?? '', 10));
    }
  });

  buttonNext.addEventListener('click', e => {
    const target = <HTMLButtonElement>e.target;
    if (target.dataset.page) {
      clickEvt(parseInt(target.dataset.page ?? '', 10));
    }
  });
}

/**
 * Locks or unlocks the button.
 * @param condition Button lock condition.
 * @param button Button.
 */
function changeDisabled(condition: boolean, button: HTMLButtonElement): void {
  const DIS = 'disabled';
  if (condition) {
    button.setAttribute(DIS, '1');
    button.classList.add(DIS);
  } else {
    button.removeAttribute(DIS);
    button.classList.remove(DIS);
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

  paginationBlock?.querySelectorAll('*').forEach(el => el.remove());

  const compPagination: Element[] = createCompressedPagination(currPage, totalPages, RANGE);
  paginationBlock.append(...compPagination);
}
