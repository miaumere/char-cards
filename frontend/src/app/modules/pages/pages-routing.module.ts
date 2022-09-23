import { PagesComponent } from './components/pages/pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/pages/books-list/books-list.component';
import { ChaptersComponent } from './components/pages/chapters/chapters.component';
import { EditPagesMenuComponent } from '../edit-story-panel/components/edit-story-panel/edit-chapters-menu/edit-pages-menu/edit-pages-menu.component';
import { ChaptersListMenuComponent } from './components/pages/chapters-list/chapters-list.component';

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
                        component: EditPagesMenuComponent,
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
