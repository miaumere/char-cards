import { AdminPanelMenuComponent } from './components/admin-panel-menu/admin-panel-menu.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ChangeCharacterDataComponent } from './components/change-character-data/change-character-data.component';
import { NewCharacterComponent } from './components/new-character/new-character.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        component: AdminPanelMenuComponent
      },
      {
        path: ':name',
        component: ChangeCharacterDataComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
