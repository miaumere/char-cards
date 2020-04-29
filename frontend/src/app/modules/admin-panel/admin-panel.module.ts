import { CharactersService } from './../../core/service/characters.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CharacterModifyComponent } from './components/character-modify/character-modify.component';
import { SharedModule } from '../shared/shared.module';
import { CharacterStoriesComponent, EditCharacterStoryComponent } from './components/character-stories/character-stories.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminPanelForCharactersComponent } from './components/admin-panel-for-characters/admin-panel-for-characters.component';
import { CharacterQuotesComponent } from './components/character-quotes/character-quotes.component';
import { CharacterImagesComponent } from './components/character-images/character-images.component';
import { CharacterRelationsComponent } from './components/character-relations/character-relations.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    CharacterModifyComponent,
    AdminPanelForCharactersComponent,
    CharacterStoriesComponent,
    EditCharacterStoryComponent,
    CharacterQuotesComponent,
    CharacterImagesComponent,
    CharacterRelationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminPanelRoutingModule,
    DragDropModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    CharactersService
  ]
})
export class AdminPanelModule { }
