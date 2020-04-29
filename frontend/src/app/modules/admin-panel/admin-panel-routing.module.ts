import { CharacterModifyComponent } from './components/character-modify/character-modify.component';

import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ChangeCharacterDataComponent } from './components/change-character-data/change-character-data.component';
import { AdminPanelForMainComponent } from './components/admin-panel-for-main/admin-panel-for-main.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        component: AdminPanelForMainComponent
      },
      {
        path: 'change/:name',
        component: ChangeCharacterDataComponent
      },
      {
        path: 'character-modify/:type',
        component: CharacterModifyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
