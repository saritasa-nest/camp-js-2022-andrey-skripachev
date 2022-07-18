import { SearchConstructor } from '../variables/constructors';

/** Search element. */
export class SearchElement {
  private readonly searchForm: HTMLFormElement;

  private readonly searchInput: HTMLInputElement;

  private readonly changeSearch: (search: string) => void;

  public constructor({
    changeSearch,
    searchFormElement,
    inputSelector,
  }: SearchConstructor) {
    if (searchFormElement === null) {
      throw new Error('Search form not found in html');
    }
    this.searchForm = searchFormElement;

    const searchInput = this.searchForm.querySelector(`.${inputSelector}`);
    if (searchInput === null) {
      throw new Error('Search input not found in html');
    }
    this.searchInput = searchInput as HTMLInputElement;

    this.changeSearch = changeSearch;

  }

  /** Initializes search. */
  public initialize(): void {
    this.searchForm.addEventListener('submit', e => {
      e.preventDefault();
      this.onSubmitForm();
    });
  }

  private onSubmitForm(): void {
    const { value } = this.searchInput;
    this.changeSearch(value);
  }
}
