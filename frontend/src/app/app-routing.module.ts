import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard.service';


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
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin-panel',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
