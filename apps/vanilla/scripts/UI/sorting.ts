import { SORTING_DIRECTIONS, DEFAULT_DIRECTION } from '../variables/constants';
import { SortingSelector } from '../variables/interfaces';

import { insertUnicodeText, removeClassFromElements } from './dom';

/** Sorting element. */
export class SortingElement {
  private readonly sorting: SortingSelector;

  private readonly sortingButtons: NodeListOf<HTMLButtonElement>;

  private readonly changeSortField: (sortingTarget: string) => void;

  public constructor(sortingSelector: SortingSelector, changeSortField: (sortingTarget: string) => void) {
    this.sorting = sortingSelector;
    this.sortingButtons = document.querySelectorAll(`.${sortingSelector.elements}`);
    this.changeSortField = changeSortField;
  }

  /**
   * Initializes sorting.
   */
  public initialize(): void {
    this.sortingButtons.forEach(element => {
      this.initializeSortingButton(element);

      element.addEventListener('click', () => {
        if (element.classList.contains(this.sorting.selected)) {
          this.toggleButtonDirection(element);
        } else {
          removeClassFromElements(this.sortingButtons, this.sorting.selected);
          element.classList.add(this.sorting.selected);
        }

        this.selectOrdering(element);
      });

    });
  }

  private initializeSortingButton(button: HTMLButtonElement): void {
    const sortingDirection = DEFAULT_DIRECTION;
    const directionElement = button.querySelector<HTMLSpanElement>(`.${this.sorting.direction}`);
    if (directionElement === null) {
      return;
    }
    button.dataset.direction = sortingDirection.toString();
    insertUnicodeText(directionElement, SORTING_DIRECTIONS[DEFAULT_DIRECTION].text);
  }

  private toggleButtonDirection(button: HTMLButtonElement): void {
    const currentDirection = Number(button.dataset.direction);
    const newDirection = (currentDirection + 1) % SORTING_DIRECTIONS.length;
    button.dataset.direction = newDirection.toString();
    const directionElement = button.querySelector<HTMLSpanElement>(`.${this.sorting.direction}`);

    if (directionElement !== null) {
      insertUnicodeText(directionElement, SORTING_DIRECTIONS[newDirection].text);
    }
  }

  private selectOrdering(button: HTMLButtonElement): void {
    const ordering = this.getSortingTargetFromButton(button);
    this.changeSortField(ordering);
  }

  private getSortingTargetFromButton(button: HTMLButtonElement): string {
    const { direction = 0, ordering = 'id' } = button.dataset;
    const directionValue = SORTING_DIRECTIONS[Number(direction)].value;
    return `${directionValue}${ordering}`;
  }
}
