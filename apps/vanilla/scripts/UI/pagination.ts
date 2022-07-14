import { RANGE } from '../variables/constants';
import { PaginationConstructor } from '../variables/constructor';
import { PaginationUpdateData } from '../variables/interfaces/pagination';

import { changeDisabled, createNode } from './dom';

/**
 * TODO (andrey-skripachev): Describe the interfaces for the class constructor.
 */

/** Pagination element. */
export class PaginationElement {
  private readonly pagination: HTMLDivElement | null;

  private readonly buttonNext: HTMLButtonElement | null;

  private readonly buttonPrevious: HTMLButtonElement | null;

  private readonly buttonSelected: string;

  private readonly buttonNotSelected: string;

  private readonly changePage: (page: number) => void;

  public constructor({
    pagination,
    buttonNext,
    buttonPrevious,
    buttonSelected,
    buttonNotSelected,
    changePage,
  }: PaginationConstructor) {
    this.pagination = pagination;
    this.buttonNext = buttonNext;
    this.buttonPrevious = buttonPrevious;
    this.buttonSelected = buttonSelected;
    this.buttonNotSelected = buttonNotSelected;
    this.changePage = changePage;
  }

  /**
   * Initializes pagination.
   */
  public initialize(): void {
    if (this.pagination !== null) {
      this.pagination.addEventListener('click', event => {
        const { target } = event;
        if (target instanceof HTMLButtonElement) {
          this.handleClick(target);
        }
      });
    }

    if (this.buttonNext !== null) {
      this.buttonNext.addEventListener('click', event => {
        const { target } = event;
        if (target instanceof HTMLButtonElement) {
          this.handleClick(target);
        }
      });
    }

    if (this.buttonPrevious !== null) {
      this.buttonPrevious.addEventListener('click', event => {
        const { target } = event;
        if (target instanceof HTMLButtonElement) {
          this.handleClick(target);
        }
      });
    }
  }

  /**
   * Updates the pagination.
   * @param param0 Current page number and total number of pages.
   */
  public update({ currentPage, totalPages }: PaginationUpdateData): void {
    if (this.buttonPrevious !== null) {
      this.buttonPrevious.dataset.page = (currentPage - 1).toString();
      changeDisabled(currentPage === 0, this.buttonPrevious);
    }

    if (this.buttonNext !== null) {
      this.buttonNext.dataset.page = (currentPage + 1).toString();
      changeDisabled(currentPage === totalPages - 1, this.buttonNext);
    }

    if (this.pagination !== null) {
      this.pagination.innerHTML = '';
      this.pagination.append(...this.createNumberedPagination(currentPage, totalPages, RANGE));
    }
  }

  private createNumberedPagination(currentPage: number, totalPages: number, range: number): Array<HTMLButtonElement | HTMLSpanElement> {
    const elementList: Array<HTMLButtonElement | HTMLSpanElement> = [];

    if (currentPage - range > 0) {
      elementList.push(this.createPaginationButton(0, currentPage === 0));
    }
    if (currentPage - range > 1) {
      elementList.push(createNode('span', '...', ''));
    }

    for (let i = Math.max(0, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
      elementList.push(this.createPaginationButton(i, currentPage === i));
    }

    if (currentPage + range < totalPages - 2) {
      elementList.push(createNode('span', '...', ''));
    }
    if (currentPage + range < totalPages - 2) {
      elementList.push(this.createPaginationButton(totalPages - 1, currentPage === totalPages - 1));
    }

    return elementList;
  }

  private createPaginationButton(page: number, isSelected: boolean): HTMLButtonElement {

    const paginationButton = document.createElement('button');
    paginationButton.textContent = (page + 1).toString();
    paginationButton.setAttribute('type', 'button');
    paginationButton.dataset.page = page.toString();
    paginationButton.classList.add('btn-flat', 'teal', isSelected ? this.buttonSelected : this.buttonNotSelected);
    return paginationButton;
  }

  private handleClick(button: HTMLButtonElement): void {
    if (!(button.classList.contains(this.buttonSelected))) {
      this.changePage(Number(button.dataset.page));
    }
  }
}
