import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharactersIndexComponent } from './characters-index/characters-index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './components/characters/characters.component';

const routes: Routes = [
  {
    path: '',
    component: CharactersIndexComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CharactersListComponent
      },
      {
        path: ':id',
        component: CharactersComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
