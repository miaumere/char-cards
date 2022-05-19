import { TranslateModule } from '@ngx-translate/core';
import { FilenameModifierPipe } from './pipes/filename-modifier.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharactersComponent } from './components/characters-article/characters.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersIndexComponent } from './characters-index.component';
import { CharactersListComponent } from './components/characters-article/components/characters-list/characters-list.component';
import { CharacterCardComponent } from './components/characters-article/components/character-card/character-card.component';
import { ProgressBarDirective } from './directives/progress-bar.directive';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { StoryComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/story/story.component';
import { CharInformationComponent } from './components/characters-article/components/character-card/subcomponents/char-information/char-information.component';
import { CharRelationsComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/char-relations/char-relations.component';
import { MeasurementsComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/measurements/measurements.component';
import { CurrentPreferencesComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/preferences/chart-components/current-preferences-chart/current-preferences-chart.component';
import { HistoricalPreferencesComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/preferences/chart-components/historical-preferences-chart/historical-preferences-chart.component';
import { PreferencesComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/preferences/preferences.component';
import { StarringInInfoComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/starring-in-info/starring-in-info.component';
import { CharacterMainInfoComponent } from './components/characters-article/components/character-card/subcomponents/character-main-info/character-main-info.component';
import { TagsComponent } from './components/tags/tags/tags.component';
import { MatChipsModule } from '@angular/material/chips';
import { TemperamentBarsComponent } from './components/characters-article/components/character-card/subcomponents/character-additional-info/subcomponents/temperament-bars/temperament-bars.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ImagesComponent } from './components/characters-article/components/character-card/subcomponents/character-main-info/subcomponents/images/images.component';
import { ProfilePicComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/profile-pic/profile-pic.component';
import { QuotesComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/quotes/quotes.component';
import { CropProfilePicComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/profile-pic/crop-profile-pic/crop-profile-pic.component';
import { ImageCropperComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/profile-pic/crop-profile-pic/image-cropper/image-cropper.component';
import { RelationTreeComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/char-relations/relation-tree/relation-tree.component';
import { EditRelationsComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/char-relations/edit-relations/edit-relations.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CharacterAdditionalInfoComponent } from './components/characters-article/components/character-card/subcomponents/character-additional-info/character-additional-info.component';
import { PreferencesLegendComponent } from './components/characters-article/components/character-card/subcomponents/char-information/subcomponents/preferences/preferences-legend/preferences-legend.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
    declarations: [
        CharactersComponent,
        CharactersIndexComponent,
        CharactersListComponent,
        CharacterCardComponent,
        FilenameModifierPipe,
        ProgressBarDirective,
        CurrentPreferencesComponent,
        HistoricalPreferencesComponent,
        CharRelationsComponent,
        StarringInInfoComponent,
        MeasurementsComponent,
        PreferencesComponent,
        StoryComponent,
        CharInformationComponent,
        CharacterMainInfoComponent,
        TagsComponent,
        TemperamentBarsComponent,
        ImagesComponent,
        ProfilePicComponent,
        QuotesComponent,
        CropProfilePicComponent,
        ImageCropperComponent,
        RelationTreeComponent,
        EditRelationsComponent,
        CharacterAdditionalInfoComponent,
        PreferencesLegendComponent,
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
        MatButtonModule,
        MatChipsModule,
        DragDropModule,
        MatExpansionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatSliderModule,
    ],
    exports: [HistoricalPreferencesComponent],

    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class CharactersModule {}
