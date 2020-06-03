import { FilenameModifierPipe } from './pipes/filename-modifier.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharactersComponent } from './components/characters-article/characters.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersMenuComponent } from './components/characters-menu/characters-menu.component';
import { CharactersIndexComponent } from './characters-index.component';
import { CharactersListComponent } from './components/characters-article/components/characters-list/characters-list.component';
import { CharacterCardComponent } from './components/characters-article/components/character-card/character-card.component';
import { ProgressBarDirective } from './directives/progress-bar.directive';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

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
    SharedModule,
    MatTableModule,
    MatRippleModule,
    MatCardModule,
    MatDividerModule
  ],
  providers: []
})
export class CharactersModule { }
