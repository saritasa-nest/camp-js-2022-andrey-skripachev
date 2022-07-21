import { PAGINATION_RANGE } from '../variables/constants/pagination';
import { PaginationUpdateData } from '../variables/interfaces/pagination';

import { toggleDisabledState, createNode } from './dom';

type PaginationCallback = (page: number) => void;
type PaginationButton = PaginationButtonComponent | null;
type PaginationBlock = HTMLDivElement | null;

interface PaginationButtonTemplate {

  /** Sets the value of the data attribute. */
  readonly setDataAttribute: (name: string, value: string) => void;

  /** Gets the value of the data attribute. */
  readonly getDataAttribute: (name: string) => string | undefined;

  /** Disables or enables button. */
  readonly toggleDisabledState: (condition: boolean) => void;

  /** Hinges the click event handler on the button. */
  readonly handleClick: (callback: PaginationCallback) => void;
}

/** Pagination button. */
class PaginationButtonComponent implements PaginationButtonTemplate {
  public constructor(
    private readonly button: HTMLButtonElement,
  ) {}

  /**
   * Sets the value of the data attribute.
   * @param name Data attribute name.
   * @param value New data attribute value.
   */
  public setDataAttribute(name: string, value: string): void {
    this.button.dataset[name] = value;
  }

  /**
   * Gets the value of the data attribute.
   * @param name Data attribute name.
   */
  public getDataAttribute(name: string): string | undefined {
    return this.button.dataset[name];
  }

  /**
   * Disables or enables button.
   * @param condition Condition for disabling the button.
   */
  public toggleDisabledState(condition: boolean): void {
    toggleDisabledState(condition, this.button);
  }

  /**
   * Hinges the click event handler on the button..
   * @param callback Function that is called by clicking on the button.
   */
  public handleClick(callback: PaginationCallback): void {
    this.button.addEventListener('click', () => {
      callback(Number(this.getDataAttribute('page')));
    });
  }
}

/**
 * Initializing the pagination button.
 * @param button Pagination button.
 */
function initPaginationButton(button: HTMLButtonElement | null): PaginationButton {
  if (button === null) {
    return null;
  }
  return new PaginationButtonComponent(button);
}

interface PaginationConstructorData {

  /** Pagination element class name. */
  readonly pagination: string;

  /** Button for moving next page class name. */
  readonly buttonNext: string;

  /** Button for moving previous page class name. */
  readonly buttonPrevious: string;

  /** The class name of the selected button.  */
  readonly buttonSelected: string;

  /** The class name of the not selected button .*/
  readonly buttonNotSelected: string;

  /** Change page function. */
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

  public constructor(data: PaginationConstructorData) {
    this.pagination = document.querySelector<HTMLDivElement>(data.pagination);
    this.buttonNext = initPaginationButton(document.querySelector<HTMLButtonElement>(data.buttonNext));
    this.buttonPrevious = initPaginationButton(document.querySelector<HTMLButtonElement>(data.buttonPrevious));
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
      this.buttonNext.handleClick(page => {
        this.changePage(page);
      });
    }

    if (this.buttonPrevious !== null) {
      this.buttonPrevious.handleClick(page => {
        this.changePage(page);
      });
    }
  }

  /**
   * Updates the pagination.
   * @param PaginationUpdateData Data for updating the content of the pagination block.
   */
  public update({ currentPage, totalPages }: PaginationUpdateData): void {

    if (this.buttonPrevious !== null) {
      this.buttonPrevious.setDataAttribute('page', String(currentPage - 1));
      this.buttonPrevious.toggleDisabledState(currentPage === 0);
    }

    if (this.buttonNext !== null) {
      this.buttonNext.setDataAttribute('page', String(currentPage + 1));
      this.buttonNext.toggleDisabledState(currentPage === totalPages - 1);
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
