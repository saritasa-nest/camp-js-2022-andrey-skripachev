import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeModule } from './features/anime/anime.module';
import { AuthModule } from './features/auth/auth.module';
import { PageNotFoundModule } from './features/page-not-found/page-not-found.module';

/** App module. */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AnimeModule,
    AuthModule,
    PageNotFoundModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
