import { PAGINATION_RANGE } from '../variables/constants/pagination';
import { PaginationUpdateData } from '../variables/interfaces/pagination';

import { changeDisabled, createNode } from './dom';

type PaginationCallback = (page: number) => void;

interface PaginationButtonTemplate {

  /** Sets the value of the data attribute. */
  readonly setDataAttribute: (name: string, value: string) => void;

  /** Gets the value of the data attribute. */
  readonly getDataAttribute: (name: string) => string | undefined;

  /** Disables or enables button. */
  readonly changeDisabled: (condition: boolean) => void;

  /** Hinges the click event handler on the button. */
  readonly handleClick: (callback: PaginationCallback) => void;
}

/** Existing pagination button. */
class PaginationButton implements PaginationButtonTemplate {
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
  public changeDisabled(condition: boolean): void {
    changeDisabled(condition, this.button);
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

/** Non-existent pagination button. */
class PaginationButtonNull implements PaginationButtonTemplate {
  public constructor() {}

  /** Sets the value of the data attribute. */
  public setDataAttribute(): void {
    return undefined;
  }

  /** Gets the value of the data attribute. */
  public getDataAttribute(): undefined {
    return undefined;
  }

  /** Disables or enables button. */
  public changeDisabled(): void {
    return undefined;
  }

  /** Hinges the click event handler on the button. */
  public handleClick(): void {
    return undefined;
  }
}

/**
 * Initializing the pagination button.
 * @param button Pagination button.
 */
function initPaginationButton(button: HTMLButtonElement | null): PaginationButton | PaginationButtonNull {
  if (button === null) {
    return new PaginationButtonNull();
  }
  return new PaginationButton(button);
}

/** Pagination class constructor. */
export interface PaginationConstructorData {

  /** Element containing numbered pagination buttons. */
  readonly pagination: HTMLDivElement | null;

  /** Button to go to the next page. */
  readonly buttonNext: HTMLButtonElement | null;

  /** Button to go to the previous page. */
  readonly buttonPrevious: HTMLButtonElement | null;

  /** The class name of the selected button. */
  readonly buttonSelected: string;

  /** Class name of the unselected button. */
  readonly buttonNotSelected: string;

  /** Changing the view page. */
  readonly changePage: PaginationCallback;
}

/** Pagination element. */
export class PaginationController {
  private readonly pagination;

  private readonly buttonNext;

  private readonly buttonPrevious;

  private readonly buttonSelected;

  private readonly buttonNotSelected;

  private readonly changePage;

  public constructor({
    pagination,
    buttonNext,
    buttonPrevious,
    buttonSelected,
    buttonNotSelected,
    changePage,
  }: PaginationConstructorData) {
    this.pagination = pagination;
    this.buttonNext = initPaginationButton(buttonNext);
    this.buttonPrevious = initPaginationButton(buttonPrevious);
    this.buttonSelected = buttonSelected;
    this.buttonNotSelected = buttonNotSelected;
    this.changePage = changePage;
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

    this.buttonNext.handleClick(page => {
      this.changePage(page);
    });

    this.buttonPrevious.handleClick(page => {
      this.changePage(page);
    });
  }

  /**
   * Updates the pagination.
   * @param PaginationUpdateData Data for updating the content of the pagination block.
   */
  public update({ currentPage, totalPages }: PaginationUpdateData): void {

    this.buttonPrevious.setDataAttribute('page', String(currentPage - 1));
    this.buttonPrevious.changeDisabled(currentPage === 0);

    this.buttonNext.setDataAttribute('page', String(currentPage + 1));
    this.buttonNext.changeDisabled(currentPage === totalPages - 1);

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
