import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

import { AnimeService } from '../../../core/services/anime.service';
import { Anime } from '../../../core/models/anime';
import { Pagination } from '../../../core/models/pagination';

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

  /** Table column names. */
  public readonly tableColumns = ['image', 'title', 'aired start', 'status', 'type'];

  public constructor(private animeService: AnimeService) {
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

  private getAnimeData(): void {
    this.animeData$ = this.animeService.getAnimeList({
      pageNumber: this.currentPage,
      maximumItemsOnPage: this.maximumAnimeOnPage,
      sorting: this.sorting,
    });
  }
}
