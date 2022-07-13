import { FilteringSelector } from "../variables/interfaces";

export class Filtering {
  private readonly filtering: FilteringSelector;

  private readonly changeFiltration: (filtration: string) => void;

  public constructor(filtering: FilteringSelector, changeFiltration: (filtration: string) => void) {
    this.filtering = filtering;
    this.changeFiltration = changeFiltration;
  }

  public initialize(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>(this.filtering.inputs);

    inputs.forEach(element => {
      element.addEventListener('click', () => {
        this.changeFiltration(element.value);
      });
    });
  }
}
