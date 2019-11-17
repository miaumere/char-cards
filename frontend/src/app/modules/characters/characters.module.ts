import { SharedModule } from './../../shared/shared.module';
import { FilenameModifierPipe } from './pipes/filename-modifier.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharactersComponent } from './components/characters/characters.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersMenuComponent } from './components/characters-menu/characters-menu.component';
import { CharactersIndexComponent } from './characters-index.component';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { ProgressBarDirective } from './directives/progress-bar.directive';

@NgModule({
  declarations: [
    CharactersComponent,
    CharactersMenuComponent,
    CharactersIndexComponent,
    CharactersListComponent,
    CharacterCardComponent,
    FilenameModifierPipe,
    ProgressBarDirective
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    SharedModule
  ],
  providers: []
})
export class CharactersModule { }
