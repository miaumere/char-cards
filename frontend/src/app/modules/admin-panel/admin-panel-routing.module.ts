import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  {
    path: 'admin-panel',
    component: AdminPanelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
