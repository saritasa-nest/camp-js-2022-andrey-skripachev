import { SORTING_DIRECTIONS, DEFAULT_DIRECTION, SortingElements } from './variables/constants';

/**
 *
 * @param button
 * @param text
 */
function placeText(element: HTMLElement, text: string): void {
  const temporary = document.createElement('div');
  temporary.innerHTML = text;

  element.innerText = temporary.innerText;
}

function getOrderingFromButton(button: HTMLButtonElement): string {
  const { direction = 0, ordering = 'id' } = button.dataset;
  const directionValue = SORTING_DIRECTIONS[Number(direction)].value;
  return `${directionValue}${ordering}`;
}

function initializeSortingButton(button: HTMLButtonElement) {
  const sortingDirection = DEFAULT_DIRECTION;
  const directionElement = button.querySelector<HTMLSpanElement>(SortingElements.TOGGLE_DIRECTION);
  if (directionElement === null) {
    return;
  }
  button.dataset.direction = String(sortingDirection);
  placeText(directionElement, SORTING_DIRECTIONS[DEFAULT_DIRECTION].text);
}

function selectOrdering(button: HTMLButtonElement, changeSortField: (ordering: string) => void): void {
  const ordering = getOrderingFromButton(button);
  changeSortField(ordering);
}

function toggleButtonDirection(button: HTMLButtonElement): void {
  const currentDirection = Number(button.dataset.direction);
  const newDirection = (currentDirection + 1) % SORTING_DIRECTIONS.length;
  button.dataset.direction = String(newDirection);
  const directionElement = button.querySelector<HTMLSpanElement>(SortingElements.TOGGLE_DIRECTION);

  if (directionElement !== null) {
    placeText(directionElement, SORTING_DIRECTIONS[newDirection].text);
  }
}

function removeClassFromElements(elements: NodeListOf<HTMLElement>, className: string): void {
  elements.forEach(element => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  });
}

/**
 * Initializes the sorting block.
 * @param elementsSelector Selector of blocks by which the anime list will be sorted.
 * @param changeSortField Function called by clicking on the sort button.
 */
export function initializeSorting(elementsSelector: string, changeSortField: (ordering: string) => void): void {
  const sortingButtons = document.querySelectorAll<HTMLButtonElement>(elementsSelector);

  sortingButtons.forEach(element => {
    initializeSortingButton(element);
    element.onclick = () => {
      if (element.classList.contains(SortingElements.SELECTED_FIELD)) {
        toggleButtonDirection(element);
      } else {
        removeClassFromElements(sortingButtons, SortingElements.SELECTED_FIELD);
        element.classList.add(SortingElements.SELECTED_FIELD);
      }

      selectOrdering(element, changeSortField);
    };
  });
}
