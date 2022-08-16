import { AfterViewInit, ChangeDetectionStrategy, ViewChild, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, combineLatestWith, debounceTime, Observable, startWith, switchMap, tap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { FormControl } from '@angular/forms';

import { AnimeListSearchParams } from '../../../../core/models/anime-list-search-params';
import { AnimeService } from '../../../../core/services/anime.service';
import { AnimeSearchParamsService } from '../../../../core/services/anime-search-params.service';
import { Sorting } from '../../../../core/models/sorting';
import { SortingMapper } from '../../../../core/services/mappers/sorting.mapper';

/** Delay between controller state changes and request sending. */
const CONTROL_ACTION_DELAY = 0.3;

const INITIAL_PAGE = 0;

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements AfterViewInit {

  private readonly dataSource = new MatTableDataSource<Anime>();

  /** Anime types. */
  public readonly availableAnimeTypes = Object.keys(AnimeType);

  /** Table column names. */
  public readonly tableColumns = ['image', 'title', 'aired start', 'status', 'type'];

  @ViewChild(MatPaginator)
  private readonly paginator: MatPaginator | null = null;

  @ViewChild(MatSort)
  private readonly sort: MatSort | null = null;

  /** Current anime list. */
  public readonly animeData$: Observable<Pagination<Anime>>;

  /** Current page. */
  public readonly currentPage$: BehaviorSubject<number>;

  /** Sorting. */
  public readonly sorting$: BehaviorSubject<Sorting>;

  /** Maximum anime in page. */
  public maximumAnimeOnPage: number;

  /** Filtering field form controller. */
  public readonly filterFormControl: FormControl<readonly AnimeType[]>;

  /** Searching input form controller. */
  public readonly searchFormControl: FormControl<string>;

  public constructor(
    animeService: AnimeService,
    private readonly searchParamsService: AnimeSearchParamsService,
  ) {
    const {
      maximumItemsOnPage,
      pageNumber,
      sorting,
      searchingTitlePart,
      types,
    } = this.searchParamsService.getAnimeListSearchParams();

    this.maximumAnimeOnPage = maximumItemsOnPage;
    this.currentPage$ = new BehaviorSubject(pageNumber);
    this.sorting$ = new BehaviorSubject(sorting);
    this.searchFormControl = new FormControl(searchingTitlePart, {
      nonNullable: true,
    });
    this.filterFormControl = new FormControl(types, {
      nonNullable: true,
    });

    const filterChanges$ = this.filterFormControl.valueChanges.pipe(
      startWith(this.filterFormControl.value),
    );
    const searchChanges$ = this.searchFormControl.valueChanges.pipe(
      startWith(this.searchFormControl.value),
    );
    const sortingChanges$ = this.sorting$;

    const resetPaginationChanges$ = combineLatest([
      filterChanges$,
      searchChanges$,
      sortingChanges$,
    ]).pipe(
      tap(() => {
        this.currentPage$.next(INITIAL_PAGE);
      }),
    );

    this.animeData$ = resetPaginationChanges$.pipe(
      combineLatestWith(this.currentPage$),
      debounceTime(CONTROL_ACTION_DELAY),
      switchMap(([[selectedFilter, selectedSearch, selectedSorting], selectedPage]) =>
        animeService.getAnimeList(new AnimeListSearchParams({
          maximumItemsOnPage: this.maximumAnimeOnPage,
          pageNumber: selectedPage,
          sorting: selectedSorting,
          types: selectedFilter,
          searchingTitlePart: selectedSearch,
        }))),
    );
  }

  /** @inheritdoc */
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Changes sorting target.
   * @param sort Sort event.
   */
  public onChangeSortingTarget(sort: Sort): void {
    this.sorting$.next(SortingMapper.fromSort(sort));
  }

  /**
   * Changes current page.
   * @param event Page event.
   */
  public onChangePage(event: PageEvent): void {
    this.currentPage$.next(event.pageIndex);
  }

  /**
   * Tracks changes by anime id.
   * @param _ Anime position in list.
   * @param anime Current anime.
   */
  public trackById(_: number, anime: Anime): number {
    return anime.id;
  }
}
