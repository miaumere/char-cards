import { PagesComponent } from './components/pages/pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/pages/books-list/books-list.component';
import { ChaptersComponent } from './components/pages/chapters/chapters.component';
import { ChaptersListMenuComponent } from './components/pages/chapters-list/chapters-list.component';
import { ChapterDetailsComponent } from './components/pages/chapters/chapter-details/chapter-details.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                component: BooksListComponent,
            },
            {
                path: 'chapters',
                component: ChaptersComponent,
                children: [
                    {
                        path: '',
                        component: ChaptersListMenuComponent,
                    },
                    {
                        path: 'pages',
                        component: ChapterDetailsComponent,
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
