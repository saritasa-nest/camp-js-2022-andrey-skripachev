import { createNode } from './dom';

type Options = [value: string, text: string][];

/**
 * TODO (andrey-skripachev): Describe the interfaces for the class constructor.
 */

/** Filtration unit. */
export class Filtering<T> {
  private readonly filtering: string;

  private readonly type: T;

  private readonly changeFiltration: (type: string) => void;

  public constructor(
    filtering: string,
    type: T,
    changeFiltration: (type: string) => void,
  ) {
    this.filtering = filtering;
    this.type = type;
    this.changeFiltration = changeFiltration;
  }

  /** Initialize filtration unit. */
  public initialize(): void {
    const select = document.querySelector<HTMLSelectElement>(this.filtering);

    if (select === null) {
      throw new Error('Select is null');
    }

    this.initializeSelect(select);

    select.addEventListener('change', () => {
      const selectedOption = select.options.item(select.options.selectedIndex);

      if (selectedOption === null) {
        return;
      }

      const filteringValue = selectedOption.value;

      if (filteringValue !== undefined) {
        this.changeFiltration(filteringValue);
      }
    });
  }

  private initializeSelect(select: HTMLSelectElement): void {
    const optionsInfo = this.getOptionsInfo();

    for (const [value, text] of optionsInfo) {
      const option = createNode('option', text, 'filtering__option');
      option.value = value;

      select.append(option);
    }
  }

  private getOptionsInfo(): Options {
    const optionsInfo: Options = [];

    for (const option of Object.entries(this.type)) {
      optionsInfo.push(option);
    }

    return optionsInfo;
  }
}
