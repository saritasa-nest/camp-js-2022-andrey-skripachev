import { AfterViewInit, ChangeDetectionStrategy, ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, Observable, startWith, Subscription, switchMap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { FormControl } from '@angular/forms';

import { AnimeListSearchParams } from '../../../../core/models/animeListSearchParams';

import { AnimeService } from '../../../../core/services/anime.service';
import { SearchParamsService } from '../../../../core/services/search-params.service';

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit, AfterViewInit, OnDestroy {

  private readonly dataSource = new MatTableDataSource<Anime>();

  /** Anime types. */
  public readonly availableAnimeTypes = Object
    .values(AnimeType)
    .filter(element => typeof element === 'string');

  /** Table column names. */
  public readonly tableColumns = ['image', 'title', 'aired start', 'status', 'type'];

  @ViewChild(MatPaginator) private readonly paginator: MatPaginator;

  @ViewChild(MatSort) private readonly sort: MatSort;

  /** Current anime list. */
  public readonly animeData$: Observable<Pagination<Anime>>;

  /** Current page. */
  public readonly currentPage$ = new BehaviorSubject<number>(0);

  /** Sorting. */
  public readonly sorting$ = new BehaviorSubject<Sort>({
    active: '',
    direction: '',
  });

  /** Maximum anime in page. */
  public maximumAnimeOnPage = 10;

  /** Subscription of handling search params changes. */
  public searchParamsChangesSubscription: Subscription = new Subscription();

  /** Filtering field form controller. */
  public filterFormControl = new FormControl<AnimeType[]>([], {
    nonNullable: true,
  });

  /** Searching input form controller. */
  public searchFormControl = new FormControl('', {
    nonNullable: true,
  });

  public constructor(
    animeService: AnimeService,
    private readonly searchParamsService: SearchParamsService,
  ) {
    const filterChanges$ = this.filterFormControl.valueChanges.pipe(
      startWith(this.filterFormControl.value),
    );
    const searchChanges$ = this.searchFormControl.valueChanges.pipe(
      startWith(this.searchFormControl.value),
    );
    this.animeData$ = combineLatest([
      filterChanges$,
      searchChanges$,
      this.currentPage$,
      this.sorting$,
    ]).pipe(
      debounceTime(300),
      switchMap(([filter, search, page, sorting]) => {
        const params = this.searchParamsService.changeSearchParams(new AnimeListSearchParams({
          maximumItemsOnPage: this.maximumAnimeOnPage,
          pageNumber: page,
          sorting,
          types: filter,
          searchingTitlePart: String(search),
        }));
        return animeService.getAnimeList(params);
      }),
    );
  }

  /**
   * Initialize component.
   * @inheritdoc
   */
  public ngOnInit(): void {
    const {
      maximumItemsOnPage,
      pageNumber,
      sorting,
      searchingTitlePart,
      types,
    } = this.searchParamsService.getAnimeListSearchParams();

    this.maximumAnimeOnPage = maximumItemsOnPage;
    this.currentPage$.next(pageNumber);
    this.sorting$.next(sorting);
    this.searchFormControl.setValue(searchingTitlePart);
    this.filterFormControl.setValue(types);
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
   * Unsubscribes.
   * @inheritdoc
   * */
  public ngOnDestroy(): void {
    this.searchParamsChangesSubscription.unsubscribe();
  }

  /**
   * Changes sorting target.
   * @param sorting Sort event.
   */
  public changeSortingTarget(sorting: Sort): void {
    this.sorting$.next(sorting);
  }

  /**
   * Changes current page.
   * @param event Page event.
   */
  public changePage(event: PageEvent): void {
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
