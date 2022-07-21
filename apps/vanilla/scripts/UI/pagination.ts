import { PAGINATION_RANGE } from '../variables/constants/pagination';
import { PaginationUpdateData } from '../variables/interfaces/pagination';

import { toggleDisabledState, createNode } from './dom';

type PaginationCallback = (page: number) => void;
type PaginationButton = HTMLButtonElement | null;
type PaginationBlock = HTMLDivElement | null;

interface PaginationCreationData {

  /** Pagination block. */
  readonly pagination: PaginationBlock;

  /** Button for moving next page. */
  readonly buttonNext: PaginationButton;

  /** Button for moving previous page. */
  readonly buttonPrevious: PaginationButton;

  /** Class name of selected button. */
  readonly buttonSelected: string;

  /** Class name of not selected button. */
  readonly buttonNotSelected: string;

  /** Changes new page. */
  readonly changePage: PaginationCallback;
}

/** Pagination element. */
export class PaginationController {
  private readonly pagination: PaginationBlock;

  private readonly buttonNext: PaginationButton;

  private readonly buttonPrevious: PaginationButton;

  private readonly buttonSelected: string;

  private readonly buttonNotSelected: string;

  private readonly changePage: PaginationCallback;

  public constructor(data: PaginationCreationData) {
    this.pagination = data.pagination;
    this.buttonNext = data.buttonNext;
    this.buttonPrevious = data.buttonPrevious;
    this.buttonSelected = data.buttonSelected;
    this.buttonNotSelected = data.buttonNotSelected;
    this.changePage = data.changePage;
  }

  /** Initializes pagination. */
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
   * @param PaginationUpdateData Data for updating the content of the pagination block.
   */
  public update({ currentPage, totalPages }: PaginationUpdateData): void {

    if (this.buttonPrevious !== null) {
      this.buttonPrevious.dataset.page = String(currentPage - 1);
      toggleDisabledState(currentPage === 0, this.buttonPrevious);
    }

    if (this.buttonNext !== null) {
      this.buttonNext.dataset.page = String(currentPage + 1);
      toggleDisabledState(currentPage === totalPages - 1, this.buttonNext);
    }

    if (this.pagination !== null) {
      this.pagination.innerHTML = '';
      this.pagination.append(...this.createNumberedPagination(currentPage, totalPages, PAGINATION_RANGE));
    }
  }

  private createNumberedPagination(currentPage: number, totalPages: number, range: number): (HTMLButtonElement | HTMLSpanElement)[] {
    const elementList: (HTMLButtonElement | HTMLSpanElement)[] = [];

    if (currentPage - range > 0) {
      elementList.push(this.createPaginationButton(0, currentPage === 0));
    }
    if (currentPage - range > 1) {
      elementList.push(createNode('span', '...'));
    }

    for (let i = Math.max(0, currentPage - range); i <= Math.min(totalPages - 1, currentPage + range); i++) {
      elementList.push(this.createPaginationButton(i, currentPage === i));
    }

    if (currentPage + range < totalPages - 2) {
      elementList.push(createNode('span', '...'));
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
