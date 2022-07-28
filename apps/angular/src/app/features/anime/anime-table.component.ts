import { AfterViewInit, ChangeDetectionStrategy, ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatestWith, debounceTime, Observable, startWith, Subscription, switchMap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { AnimeListSearchParams } from '@js-camp/core/models/animeListSearchParams';
import { FormControl } from '@angular/forms';

import { AnimeService } from '../../../core/services/anime.service';
import { SearchParamsService } from '../../../core/services/search-params.service';

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit, AfterViewInit, OnDestroy {

  private readonly dataSource = new MatTableDataSource<Anime>();

  @ViewChild(MatPaginator) private readonly paginator: MatPaginator;

  @ViewChild(MatSort) private readonly sort: MatSort;

  /** Current anime list. */
  public animeData$ = new Observable<Pagination<Anime>>();

  /** Current page number.  */
  public currentPage: number;

  /** Maximum anime in page. */
  public maximumAnimeOnPage: number;

  /** Sorting target. */
  public sorting: Sort;

  /** Selected anime types. */
  public selectedAnimeTypes: AnimeType[];

  /** Table column names. */
  public readonly tableColumns = ['image', 'title', 'aired start', 'status', 'type'];


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

  /** Anime types. */
  public readonly availableAnimeTypes = Object
    .values(AnimeType)
    .filter(element => typeof element === 'string');

  public constructor(
    private readonly animeService: AnimeService,
    private readonly searchParamsService: SearchParamsService,
  ) {
    this.animeData$ = this.filterFormControl.valueChanges.pipe(
      startWith(this.filterFormControl.value),
      combineLatestWith(this.searchFormControl.valueChanges.pipe(
        startWith(this.searchFormControl.value),
      )),

      debounceTime(500),

      switchMap(([filter, search]) => {
        const params = this.searchParamsService.setSearchParams(new AnimeListSearchParams({
          maximumItemsOnPage: this.maximumAnimeOnPage,
          pageNumber: this.currentPage,
          sorting: this.sorting,
          types: filter,
          titlePart: search,
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
    this.searchParamsChangesSubscription = this.searchParamsService
      .getAnimeListSearchParams()
      .subscribe(animeTableDefaultData => {
        this.currentPage = animeTableDefaultData.pageNumber;
        this.maximumAnimeOnPage = animeTableDefaultData.maximumItemsOnPage;
        this.sorting = animeTableDefaultData.sorting;
        this.searchFormControl.setValue(animeTableDefaultData.titlePart);
        this.filterFormControl.setValue(animeTableDefaultData.types);
      });
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
   * Tracks changes by anime id.
   * @param _ Anime position in list.
   * @param anime Current anime.
   */
  public trackById(_: number, anime: Anime): number {
    return anime.id;
  }

  private getAnimeData(): void {
    const params = this.searchParamsService.setSearchParams(new AnimeListSearchParams({
      maximumItemsOnPage: this.maximumAnimeOnPage,
      pageNumber: this.currentPage,
      sorting: this.sorting,
      types: this.filterFormControl.value,
      titlePart: this.searchFormControl.value,
    }));

    this.animeData$ = this.animeService.getAnimeList(params);
  }
}
