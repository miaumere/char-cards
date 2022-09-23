import { TranslateModule } from '@ngx-translate/core';
import { StoryService } from 'src/app/core/service/story.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditStoryPanelComponent } from './components/edit-story-panel/edit-story-panel.component';
import { EditStoryPanelRoutingModule } from './edit-story-panel-routing.module';
import { EditStoryMenuComponent } from './components/edit-story-panel/edit-story-menu/edit-story-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { EditPagesMenuComponent } from './components/edit-story-panel/edit-chapters-menu/edit-pages-menu/edit-pages-menu.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CharactersModule } from '../characters/characters.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    declarations: [
        EditStoryPanelComponent,
        EditStoryMenuComponent,
        EditPagesMenuComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        SharedModule,
        EditStoryPanelRoutingModule,
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
        MatTreeModule,
        MatListModule,
        MatSidenavModule,
        MatTabsModule,
        TranslateModule,
        CharactersModule,
        MatExpansionModule,
    ],
    providers: [StoryService],
})
export class EditStoryPanelModule {}
