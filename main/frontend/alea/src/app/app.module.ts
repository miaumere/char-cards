import { SideCharactersModule } from './modules/side-characters/side-characters.module';
import { CharactersModule } from './modules/characters/characters.module';
import { PagesModule } from './modules/pages/pages.module';
import { MainModule } from './modules/main/main.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
    PagesModule,
    CharactersModule,
    SideCharactersModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
