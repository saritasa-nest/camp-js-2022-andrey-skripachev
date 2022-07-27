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
import { AnimeListSearchParams } from '@js-camp/core/models/animeListSearchParams';

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
  public currentPage: number;

  /** Maximum anime in page. */
  public maximumAnimeOnPage: number;

  /** Sorting target. */
  public sorting: Sort;

  private lastSelectedAnimeTypes: AnimeType[];

  /** Selected anime types. */
  public selectedAnimeTypes: AnimeType[];

  /** Table column names. */
  public readonly tableColumns = ['image', 'title', 'aired start', 'status', 'type'];

  private lastAnimeTitle: string;

  /** Searching english title. */
  public animeTitle: string;

  /** Anime types. */
  public readonly availableAnimeTypes = Object
    .values(AnimeType)
    .filter(element => typeof element === 'string');

  public constructor(
    private readonly animeService: AnimeService,
    private readonly searchParamsService: SearchParamsService,
  ) {
    this.searchParamsService.getAnimeListSearchParams().subscribe(animeTableDefaultData => {
      this.currentPage = animeTableDefaultData.pageNumber;
      this.maximumAnimeOnPage = animeTableDefaultData.maximumItemsOnPage;
      this.sorting = animeTableDefaultData.sorting;
      this.animeTitle = animeTableDefaultData.titlePart;
      this.selectedAnimeTypes = animeTableDefaultData.types;

      this.getAnimeData();
    })
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
    const params = this.searchParamsService.setSearchParams(new AnimeListSearchParams({
      maximumItemsOnPage: this.maximumAnimeOnPage,
      pageNumber: this.currentPage,
      sorting: this.sorting,
      types: this.selectedAnimeTypes,
      titlePart: this.animeTitle
    }));

    this.animeData$ = this.animeService.getAnimeList(params);
  }
}
