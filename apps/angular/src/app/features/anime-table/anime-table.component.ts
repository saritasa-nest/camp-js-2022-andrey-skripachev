import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AnimeService } from '../../../core/services/anime.service';
import { Anime } from '../../../core/models/anime';
import { Pagination } from '../../../core/models/pagination';
import { SearchParamsService } from '../../../core/services/search-params.service';

const START_PAGE = 0;

/** Table for displaying the anime list. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit, AfterViewInit {

  private readonly dataSource = new MatTableDataSource<Anime>();

  /** Paginator. */
  @ViewChild(MatPaginator) private readonly paginator: MatPaginator;

  /** Current anime list. */
  public animeData$: Observable<Pagination<Anime>> | null = null;

  /**  */
  public currentPage: number;

  /** Table column names. */
  public tableColumns: string[] = ['image', 'title', 'aired start', 'status', 'type'];

  public constructor(
    private animeService: AnimeService,
    private searchParamsService: SearchParamsService,
  ) {
    this.currentPage = this.searchParamsService.getPage();
  }

  /**
   * Gets a list of anime from the server.
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.getAnime();
  }

  /**
   * Initialize paginator.
   * @inheritdoc
   */
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.currentPage = this.searchParamsService.getPage();
  }

  /**
   * Changes page.
   * @param pageEvent Page event.
   */
  public async changePage(pageEvent: PageEvent): Promise<void> {
    const newPage = pageEvent.pageIndex;
    this.currentPage = newPage;

    console.log(newPage);

    await this.searchParamsService.setPage(newPage);
    this.getAnime();
  }

  private getAnime(): void {
    this.animeData$ = this.animeService.getAnimeList(this.searchParamsService.getParams());
  }
}
