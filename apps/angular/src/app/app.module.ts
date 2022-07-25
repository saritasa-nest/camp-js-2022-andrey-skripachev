import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeTableComponent } from './features/anime-table/anime-table.component';

/** App module. */
@NgModule({
  declarations: [AppComponent, AnimeTableComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule, HttpClientModule, MatTableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
