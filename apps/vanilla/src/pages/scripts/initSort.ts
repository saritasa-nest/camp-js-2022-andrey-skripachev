import { DIRECTIONS, SELECT_ORDERING_BUTTON_SELECTOR, TOGGLE_BUTTON_SELECTOR } from './constants';

/**
 * Initializes the sorting block.
 * @param elements Blocks by which the anime list will be sorted.
 * @param evt Function called by clicking on the sort button.
 */
export function initializeSorting(elements: NodeListOf<Element>, evt: Function): void {

  const dirLength = DIRECTIONS.length;
  const startDirId = 0;

  const initDirectionButton = (button: HTMLButtonElement): void => {
    button.dataset.dir = startDirId.toString();
    button.textContent = DIRECTIONS[startDirId].text;
    button.onclick = () => {
      const { dir } = button.dataset;
      const dirId = parseInt(dir ?? '0', 10);
      const newDir = (dirId + 1) % dirLength;
      button.dataset.dir = newDir.toString();
      button.textContent = DIRECTIONS[newDir].text;
    };
  };

  elements.forEach(elem => {
    initDirectionButton(<HTMLButtonElement>elem.querySelector(TOGGLE_BUTTON_SELECTOR));

    elem.addEventListener('click', () => {
      const orderingButton = <HTMLButtonElement>elem.querySelector(SELECT_ORDERING_BUTTON_SELECTOR);
      const directionButton = <HTMLButtonElement>elem.querySelector(TOGGLE_BUTTON_SELECTOR);
      const ordering = orderingButton.dataset.type;
      const direction = parseInt(directionButton.dataset.dir ?? '0', 10);
      evt(`${DIRECTIONS[direction].requestPrefix}${ordering}`);
    });
  });
}
