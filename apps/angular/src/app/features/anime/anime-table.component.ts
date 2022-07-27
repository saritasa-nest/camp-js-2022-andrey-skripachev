import { AfterViewInit, ChangeDetectionStrategy, ViewChild, TrackByFunction, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeType } from '@js-camp/core/utils/types/animeType';

import { AnimeService } from '../../../core/services/anime.service';
import { SearchParamsService } from '../../../core/services/search-params.service';

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements AfterViewInit {

  private readonly dataSource = new MatTableDataSource<Anime>();

  @ViewChild(MatPaginator) private readonly paginator: MatPaginator;

  @ViewChild(MatSort) private readonly sort: MatSort;

  /** Current anime list. */
  public animeData$ = new Observable<Pagination<Anime>>();

  /** Current page number.  */
  public currentPage = 0;

  /** Maximum anime in page. */
  public maximumAnimeOnPage = 10;

  /** Sorting target. */
  public sorting: Sort = {
    active: '',
    direction: '',
  };

  private lastSelectedAnimeTypes = [];

  /** Selected anime types. */
  public selectedAnimeTypes = [];

  /** Table column names. */
  public readonly tableColumns = ['image', 'title', 'aired start', 'status', 'type'];

  private lastAnimeTitle = '';

  /** Searching english title. */
  public animeTitle = '';

  /** Anime types. */
  public readonly availableAnimeTypes = Object
    .values(AnimeType)
    .filter(element => typeof element === 'string');

  public constructor(
    private readonly animeService: AnimeService,
    private readonly searchParamsService: SearchParamsService,
  ) {
    this.getAnimeData();
  }

  /**
   * Initialize paginator.
   * @inheritdoc
   */
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Changes page.
   * @param pageEvent Page event.
   */
  public changePage(pageEvent: PageEvent): void {
    const newPage = pageEvent.pageIndex;
    this.currentPage = newPage;

    this.getAnimeData();
  }

  /**
   * Changes sorting target.
   * @param sorting Sort event.
   */
  public changeSortingTarget(sorting: Sort): void {
    this.sorting = sorting;
    this.currentPage = 0;

    this.getAnimeData();
  }

  /**
   * Updates selected anime types.
   * @param value Array of selected anime types.
   */
  public changeAnimeTypes({ value }: MatSelectChange): void {
    this.selectedAnimeTypes = value;
  }

  /**
   * Changes title when changes input value.
   * @param target Event target.
   */
  public changeSearchingTitle({ target }: Event): void {
    if (target instanceof HTMLInputElement) {
      const { value } = target;

      this.animeTitle = String(value);
    }
  }

  /** Completes the entry of values. */
  public confirmChanges(): void {
    if (this.animeTitle === this.lastAnimeTitle &&
      this.selectedAnimeTypes.join('') === this.lastSelectedAnimeTypes.join('')
    ) {
      return;
    }

    this.lastAnimeTitle = this.animeTitle;
    this.lastSelectedAnimeTypes = this.selectedAnimeTypes;

    this.currentPage = 0;
    this.getAnimeData();
  }

  /**
   * Tracks changes by anime id.
   * @param _ Anime position in list.
   * @param anime Current anime.
   */
  public trackById: TrackByFunction<Anime> = function(_, anime) {
    return anime.id;
  };

  private getAnimeData(): void {
    this.animeData$ = this.animeService.getAnimeList(this.searchParamsService.createSearchParams({
      pageNumber: this.currentPage,
      maximumItemsOnPage: this.maximumAnimeOnPage,
      sorting: this.sorting,
      types: this.selectedAnimeTypes.map(AnimeType.toAnimeType),
      title: this.animeTitle,
    }));
  }
}
