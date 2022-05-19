import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CharactersService } from './../../core/service/characters.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CharacterModifyComponent } from './components/character-modify/character-modify.component';
import { SharedModule } from '../shared/shared.module';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminPanelForCharactersComponent } from './components/admin-panel-for-characters/admin-panel-for-characters.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { CountriesService } from 'src/app/core/service/countries.service';
import { CharacterPreferencesComponent } from './components/character-preferences/character-preferences.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    declarations: [
        AdminPanelComponent,
        CharacterModifyComponent,
        AdminPanelForCharactersComponent,
        CharacterPreferencesComponent,
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
        MatExpansionModule,
        TranslateModule,
    ],
    providers: [CharactersService, CountriesService],
})
export class AdminPanelModule {}
