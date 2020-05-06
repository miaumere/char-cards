import { StoryService } from 'src/app/core/service/story.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PagesComponent } from './components/pages/pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { BooksListComponent } from './components/pages/books-list/books-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatIconModule, MatListModule } from '@angular/material';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    PagesComponent,
    BooksListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PagesRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatRippleModule

  ],
  providers: [
    StoryService
  ]
})
export class PagesModule { }
