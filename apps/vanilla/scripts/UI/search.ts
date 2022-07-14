import { SearchConstructor } from '../variables/constructors';

/**
 * Search element.
 */
export class SearchElement {
  private readonly searchForm: HTMLFormElement;

  private readonly searchInput: HTMLInputElement | null;

  private readonly changeSearch: (search: string) => void;

  public constructor({
    changeSearch,
    searchFromElement,
    inputSelector,
  }: SearchConstructor) {
    if (searchFromElement === null) {
      throw new Error('Search form not found in html');
    }
    this.searchForm = searchFromElement;

    this.searchInput = document.querySelector(`.${inputSelector}`);

    this.changeSearch = changeSearch;

  }

  /**
   * Initializes search.
   */
  public initialize(): void {
    if (this.searchInput === null) {
      throw new Error('input not founded in html');
    }

    this.searchForm.addEventListener('submit', e => {
      e.preventDefault();
      this.onSubmitForm();
    });
  }

  private onSubmitForm(): void {

    if (this.searchInput === null) {
      throw new Error('input not founded in html');
    }

    const { value } = this.searchInput;
    this.changeSearch(value);
  }
}
