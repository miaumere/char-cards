import { SanitizerPipe } from './../../shared/pipes/sanitizer.pipe';

import { CharactersService } from './../../core/service/characters.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ChangeCharacterDataComponent } from './components/change-character-data/change-character-data.component';
import { AdminPanelMenuComponent } from './components/admin-panel-menu/admin-panel-menu.component';
import { CharacterModifyComponent } from './components/character-modify/character-modify.component';
import { SideCharactersService } from 'src/app/core/service/side-characters.service';
import { AdminPanelForMainComponent } from './components/admin-panel-for-main/admin-panel-for-main.component';
import { AdminPanelForSideComponent } from './components/admin-panel-for-side/admin-panel-for-side.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    ChangeCharacterDataComponent,
    AdminPanelMenuComponent,
    CharacterModifyComponent,
    AdminPanelForMainComponent,
    AdminPanelForSideComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminPanelRoutingModule
  ],
  providers: [
    CharactersService,
    SideCharactersService
  ]
})
export class AdminPanelModule { }
