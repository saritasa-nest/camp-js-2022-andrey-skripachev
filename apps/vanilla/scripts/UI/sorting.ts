import { SORTING_DIRECTIONS, DEFAULT_DIRECTION } from '../variables/constants/sorting';

import { removeClassFromElements } from './dom';

/** Sort class constructor. */
export interface SortingConstructorData {

  /** Sorting buttons. */
  readonly sortingButtons: NodeListOf<HTMLButtonElement>;

  /** Selector of element showing sorting direction. */
  readonly direction: string;

  /** The class name of the selected button. */
  readonly selected: string;

  /** Changing the sorting target. */
  readonly changeSortField: (sortingTarget: string) => void;
}

/** Sorting element. */
export class SortingController {
  private readonly sortingButtons: NodeListOf<HTMLButtonElement>;

  private readonly selected: string;

  private readonly directionElementSelector: string;

  private readonly changeSortField: (sortingTarget: string) => void;

  public constructor({
    sortingButtons, direction, selected, changeSortField,
  }: SortingConstructorData) {
    this.sortingButtons = sortingButtons;
    this.directionElementSelector = direction;
    this.selected = selected;
    this.changeSortField = changeSortField;
  }

  /** Initializes sorting. */
  public initialize(): void {
    this.sortingButtons.forEach(element => {
      this.initializeSortingButton(element);

      element.addEventListener('click', () => {
        if (element.classList.contains(this.selected)) {
          this.toggleButtonDirection(element);
        } else {
          removeClassFromElements(this.sortingButtons, this.selected);
          element.classList.add(this.selected);
        }

        this.selectOrdering(element);
      });

    });
  }

  private initializeSortingButton(button: HTMLButtonElement): void {
    const sortingDirection = DEFAULT_DIRECTION;
    const directionElement = button.querySelector<HTMLSpanElement>(`.${this.directionElementSelector}`);
    if (directionElement !== null) {
      directionElement.innerHTML = SORTING_DIRECTIONS[DEFAULT_DIRECTION].text;
    }
    button.dataset.direction = sortingDirection.toString();
  }

  private toggleButtonDirection(button: HTMLButtonElement): void {
    const currentDirection = Number(button.dataset.direction);
    const newDirection = (currentDirection + 1) % SORTING_DIRECTIONS.length;
    button.dataset.direction = newDirection.toString();
    const directionElement = button.querySelector<HTMLSpanElement>(`.${this.directionElementSelector}`);

    if (directionElement !== null) {
      directionElement.innerHTML = SORTING_DIRECTIONS[newDirection].text;
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
