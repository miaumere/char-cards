import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'char-cards',
    loadChildren: () => import('./modules/characters/characters.module').then(m => m.CharactersModule)
  },
  {
    path: 'side-characters',
    loadChildren: () => import('./modules/side-characters/side-characters.module')
      .then(m => m.SideCharactersModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
