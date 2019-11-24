import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ChangeCharacterDataComponent } from './components/change-character-data/change-character-data.component';
import { AdminPanelMenuComponent } from './components/admin-panel-menu/admin-panel-menu.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    ChangeCharacterDataComponent,
    AdminPanelMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminPanelModule { }
