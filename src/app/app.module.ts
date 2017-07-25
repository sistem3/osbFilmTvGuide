import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FilmTvGuideComponent } from './film-tv-guide/film-tv-guide.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmTvGuideComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
