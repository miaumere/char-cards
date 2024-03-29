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
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChaptersComponent } from './components/pages/chapters/chapters.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChapterPreviewComponent } from './components/pages/chapters/chapter-preview/chapter-preview.component';
import { TranslateModule } from '@ngx-translate/core';
import { BookEditDialogComponent } from './components/pages/books-list/book-edit-dialog/book-edit-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChaptersListMenuComponent } from './components/pages/chapters-list/chapters-list.component';
import { EditChapterDialogComponent } from './components/pages/chapters-list/edit-chapter-dialog/edit-chapter-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { ChapterDetailsComponent } from './components/pages/chapters/chapter-details/chapter-details.component';
import { ChapterStarringCharactersComponent } from './components/pages/chapters-list/chapter-starring-characters/chapter-starring-characters.component';

@NgModule({
    declarations: [
        PagesComponent,
        BooksListComponent,
        ChaptersComponent,
        ChapterPreviewComponent,
        BookEditDialogComponent,
        ChaptersListMenuComponent,
        EditChapterDialogComponent,
        ChapterDetailsComponent,
        ChapterStarringCharactersComponent,
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
        MatFormFieldModule,
        DragDropModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatAutocompleteModule,
        MatCardModule,
        MatIconModule,
        MatTreeModule,
        MatListModule,
        MatSidenavModule,
        MatTabsModule,
        TranslateModule,
        CharactersModule,
        MatExpansionModule,
    ],
    providers: [StoryService],
})
export class PagesModule {}
