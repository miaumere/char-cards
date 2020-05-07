import { PagesComponent } from './components/pages/pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/pages/books-list/books-list.component';
import { ChaptersComponent } from './components/pages/chapters/chapters.component';
import { ChaptersListComponent } from './components/pages/chapters/chapters-list/chapters-list.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: BooksListComponent
      },
      {
        path: 'chapters',
        component: ChaptersComponent,
        children: [
          {
            path: '',
            component: ChaptersListComponent
          },
          // {
          //   path: 'chapter',
          //   component:
          // }

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
