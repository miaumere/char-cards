import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';


import { AppComponent } from './app.component';

import { CharactersModule } from './modules/characters/characters.module';
import { PagesModule } from './modules/pages/pages.module';
import { MainModule } from './modules/main/main.module';
import { LoginModule } from './modules/login/login.module';
import { SharedModule } from './modules/shared/shared.module';
import { NavbarComponent } from './core/components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    HttpClientModule,
    MainModule,
    PagesModule,
    CharactersModule,
    LoginModule,
    SharedModule,
    CoreModule,
    RouterModule,
    MatSliderModule
  ],
  providers: [
    HttpClientModule,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
