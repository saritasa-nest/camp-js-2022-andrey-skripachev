import { DIRECTIONS, SortingSelector } from './constants';

/**
 * Function assigns an event handler to the button.
 * @param button Sorting mode switch button.
 */
function initializeSwitchDirectionButton(button: HTMLButtonElement | null): void {
  if (button === null) {
    return;
  }
  const START = 0;

  button.dataset.direction = START.toString();
  button.textContent = DIRECTIONS[START].text;

  button.onclick = () => {
    const { direction } = button.dataset;
    const directionId = parseInt(direction ?? '0', 10);
    const newDirection = (directionId + 1) % DIRECTIONS.length;

    button.dataset.direction = newDirection.toString();
    button.textContent = DIRECTIONS[newDirection].text;
  };
}

/**
 * Function initializes the sorting block.
 * @param elementsSelector Selector of blocks by which the anime list will be sorted.
 * @param callback Function called by clicking on the sort button.
 */
export function initializeSorting(elementsSelector: string, callback: (requestPart: string) => void): void {
  const elements = document.querySelectorAll<HTMLElement>(elementsSelector);

  for (const element of elements) {
    initializeSwitchDirectionButton(element.querySelector<HTMLButtonElement>(SortingSelector.TOGGLE_BUTTON));

    element.onclick = () => {
      const orderingButton = element.querySelector<HTMLButtonElement>(SortingSelector.SELECT_ORDERING_BUTTON);
      const directionButton = element.querySelector<HTMLButtonElement>(SortingSelector.TOGGLE_BUTTON);

      if (orderingButton === null || directionButton === null) {
        return;
      }

      const ordering = orderingButton.dataset.type;
      const direction = parseInt(directionButton.dataset.direction ?? '0', 10);
      callback(`${DIRECTIONS[direction].requestPrefix}${ordering}`);
    };
  }
}
