import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AnimeService } from '../../../core/services/anime.service';
import { Anime } from '../../../core/models/anime';
import { Pagination } from '../../../core/models/pagination';

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements AfterViewInit {

  private readonly dataSource = new MatTableDataSource<Anime>();

  /** Paginator. */
  @ViewChild(MatPaginator) private readonly paginator: MatPaginator;

  /** Current anime list. */
  public animeData$ = new Observable<Pagination<Anime>>();

  /** Current page number.  */
  public currentPage = 0;

  /** Maximum anime in page. */
  public readonly maximumAnimeOnPage = 10;

  /** Sorting target. */
  public readonly sortingTarget = 'id';

  /** Table column names. */
  public readonly tableColumns = ['image', 'title', 'aired start', 'status', 'type'];

  public constructor(
    private animeService: AnimeService,
  ) {
    this.getAnimeData();
  }

  /**
   * Initialize paginator.
   * @inheritdoc
   */
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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

  private getAnimeData(): void {
    this.animeData$ = this.animeService.getAnimeList({
      pageNumber: this.currentPage,
      maximumItemsOnPage: this.maximumAnimeOnPage,
      sortingTarget: this.sortingTarget,
    });
  }
}
