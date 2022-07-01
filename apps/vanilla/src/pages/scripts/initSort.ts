/**
 * Initializes the sorting block.
 * @param elements Blocks by which the anime list will be sorted.
 * @param evt Function called by clicking on the sort button.
 */
export function initializeSorting(elements: NodeListOf<Element>, evt: Function): void {
  const initDirectionButton = (button: HTMLButtonElement): void => {
    button.dataset.dir = '';
    button.textContent = 'inc';
    button.onclick = () => {
      const { dir } = button.dataset;
      button.dataset.dir = dir === '-' ? '' : '-';
      button.textContent = dir === '-' ? 'inc' : 'dec';
    };
  };

  elements.forEach(elem => {
    initDirectionButton(<HTMLButtonElement>elem.querySelector('.toggle-button'));
    elem.addEventListener('click', () => {
      const orderingButton = <HTMLButtonElement>elem.querySelector('button.select-ordering-button');
      const directionButton = <HTMLButtonElement>elem.querySelector('button.toggle-button');
      const ordering = orderingButton.dataset.type;
      const direction = directionButton.dataset.dir;
      evt(`${direction}${ordering}`);
    });
  });
}

/**
 * TODO:
 * 1 - refactor.
 */
