import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeTableComponent } from './features/anime-table/anime-table.component';

/** App module. */
@NgModule({
  declarations: [AppComponent, AnimeTableComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
