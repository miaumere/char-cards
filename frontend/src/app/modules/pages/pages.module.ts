import { CharactersModule } from './../characters/characters.module';
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
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChaptersComponent } from './components/pages/chapters/chapters.component';
import { ChaptersListComponent } from './components/pages/chapters/chapters-list/chapters-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChapterComponent } from './components/pages/chapters/chapter/chapter.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        PagesComponent,
        BooksListComponent,
        ChaptersComponent,
        ChaptersListComponent,
        ChapterComponent,
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
        MatRippleModule,
        MatSidenavModule,
        MatExpansionModule,
        TranslateModule,
        CharactersModule,
    ],
    providers: [StoryService],
})
export class PagesModule {}
