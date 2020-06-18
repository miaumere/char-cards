import { TranslateService, TranslateModule } from '@ngx-translate/core';
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
import { AdminPanelForCharactersComponent } from './components/admin-panel-for-characters/admin-panel-for-characters.component';
import { CharacterQuotesComponent } from './components/character-quotes/character-quotes.component';
import { CharacterImagesComponent } from './components/character-images/character-images.component';
import { CharacterRelationsComponent } from './components/character-relations/character-relations.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatIconModule, MatTabsModule, MatSidenavModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { CountriesService } from 'src/app/core/service/countries.service';
import { CharacterPreferencesComponent } from './components/character-preferences/character-preferences.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    CharacterModifyComponent,
    AdminPanelForCharactersComponent,
    CharacterStoriesComponent,
    EditCharacterStoryComponent,
    CharacterQuotesComponent,
    CharacterImagesComponent,
    CharacterRelationsComponent,
    CharacterPreferencesComponent
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
    MatTooltipModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    TranslateModule
  ],
  providers: [
    CharactersService,
    CountriesService
  ]
})
export class AdminPanelModule { }
