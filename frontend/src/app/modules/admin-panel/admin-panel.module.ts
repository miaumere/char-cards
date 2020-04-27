import { CharactersService } from './../../core/service/characters.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ChangeCharacterDataComponent } from './components/change-character-data/change-character-data.component';
import { AdminPanelMenuComponent } from './components/admin-panel-menu/admin-panel-menu.component';
import { CharacterModifyComponent } from './components/character-modify/character-modify.component';
import { AdminPanelForMainComponent } from './components/admin-panel-for-main/admin-panel-for-main.component';
import { SharedModule } from '../shared/shared.module';
import { CharacterStoriesComponent } from './components/character-stories/character-stories.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AdminPanelComponent,
    ChangeCharacterDataComponent,
    AdminPanelMenuComponent,
    CharacterModifyComponent,
    AdminPanelForMainComponent,
    CharacterStoriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminPanelRoutingModule,
    DragDropModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    CharactersService
  ]
})
export class AdminPanelModule { }
