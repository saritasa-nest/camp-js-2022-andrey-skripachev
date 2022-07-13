import { Pagination } from '@js-camp/core/models/pagination';

import { RANGE } from '../variables/constants';
import { PaginationSelector } from '../variables/interfaces';

import { changeDisabled, createNode } from './dom';

/**
 * Pagination element.
 */
export class PaginationElement {
  private readonly pagination: PaginationSelector;

  private readonly paginationBlock: HTMLDivElement | null;

  private readonly buttonNext: HTMLButtonElement | null;

  private readonly buttonPrevious: HTMLButtonElement | null;

  private readonly changePage: (page: number) => void;

  public constructor(pagination: PaginationSelector, changePage: (page: number) => void) {
    this.pagination = pagination;
    this.changePage = changePage;

    this.paginationBlock = document.querySelector<HTMLDivElement>(`.${pagination.block}`);
    this.buttonNext = document.querySelector<HTMLButtonElement>(`.${pagination.buttonNext}`);
    this.buttonPrevious = document.querySelector<HTMLButtonElement>(`.${pagination.buttonPrevious}`);
  }

  /**
   * Initializes pagination.
   */
  public initialize(): void {
    if (this.paginationBlock !== null) {
      this.paginationBlock.addEventListener('click', event => {
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
  public update({ currentPage, totalPages }: Pagination): void {
    if (this.buttonPrevious !== null) {
      this.buttonPrevious.dataset.page = (currentPage - 1).toString();
      changeDisabled(currentPage === 0, this.buttonPrevious);
    }

    if (this.buttonNext !== null) {
      this.buttonNext.dataset.page = (currentPage + 1).toString();
      changeDisabled(currentPage === totalPages - 1, this.buttonNext);
    }

    if (this.paginationBlock !== null) {
      this.paginationBlock.innerHTML = '';
      this.paginationBlock.append(...this.createNumberedPagination(currentPage, totalPages, RANGE));
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
    const { selectedButton, notSelectedButton, button } = this.pagination;

    const paginationButton = document.createElement('button');
    paginationButton.textContent = (page + 1).toString();
    paginationButton.setAttribute('type', 'button');
    paginationButton.dataset.page = page.toString();
    paginationButton.classList.add('btn-flat', 'teal', button, isSelected ? selectedButton : notSelectedButton);
    return paginationButton;
  }

  private handleClick(button: HTMLButtonElement): void {
    if (!(button.classList.contains(this.pagination.selectedButton))) {
      this.changePage(Number(button.dataset.page));
    }
  }
}
