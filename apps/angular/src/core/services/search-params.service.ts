import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/** Class for construction search parameters of the request. */
@Injectable({
  providedIn: 'root',
})
export class SearchParamsService {
  private httpParams: HttpParams = new HttpParams({
    fromString: window.location.search,
  });

  private receivesItemsLimit = 10;

  public constructor(
    private routing: Router,
  ) {}

  public async setPage(pageNumber: number): Promise<void> {
    await this.set('offset', pageNumber * this.receivesItemsLimit);
  }

  public getPage(): number {
    const offset = this.httpParams.get('offset');
    const page = typeof offset === 'number' ? Math.floor(offset / this.receivesItemsLimit) : 0;
    return page;
  }

  public async setMaximumItemsCount(newItemsCount: number): Promise<void> {
    await this.set('limit', newItemsCount);
  }

  public getMaximumItemsCount(): number {
    return Number(this.httpParams.get('limit')) ?? 10;
  }

  public getParams(): string {
    return window.location.search;
  }

  private async set(paramName: string, paramValue: string | number): Promise<void> {
    this.httpParams = this.httpParams.set(paramName, paramValue);
    const offset = this.httpParams.get('offset');
    this.routing.navigate([], {
      queryParams: {
        offset,
        limit: this.httpParams.get('limit'),
        ordering: this.httpParams.get('ordering'),
      },
    });
  }
}
