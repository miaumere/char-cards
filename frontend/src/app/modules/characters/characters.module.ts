import { TranslateModule } from '@ngx-translate/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CurrentPreferencesComponent } from './components/characters-article/components/character-card/current-preferences-chart/current-preferences-chart.component';
import { HistoricalPreferencesComponent } from './components/characters-article/components/character-card/historical-preferences-chart/historical-preferences-chart.component';
import { FamilyTreeComponent } from './components/characters-article/components/character-card/family-tree/family-tree.component';

@NgModule({
  declarations: [
    CharactersComponent,
    CharactersMenuComponent,
    CharactersIndexComponent,
    CharactersListComponent,
    CharacterCardComponent,
    FilenameModifierPipe,
    ProgressBarDirective,
    CurrentPreferencesComponent,
    HistoricalPreferencesComponent,
    FamilyTreeComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule,
    MatRippleModule,
    MatCardModule,
    MatDividerModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: []
})
export class CharactersModule { }
