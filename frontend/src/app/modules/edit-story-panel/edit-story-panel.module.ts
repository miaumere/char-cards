import { TranslateModule } from '@ngx-translate/core';
import { StoryService } from 'src/app/core/service/story.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MatButtonModule, MatInputModule, MatDialogModule,
  MatTooltipModule, MatStepperModule, MatRadioModule, MatSelectModule, MatDatepickerModule,
  MatNativeDateModule, MatCheckboxModule, MatSlideToggleModule, MatSliderModule, MatAutocompleteModule,
  MatCardModule, MatSidenavModule
} from '@angular/material';
import { EditStoryPanelComponent } from './components/edit-story-panel/edit-story-panel.component';
import { EditStoryPanelRoutingModule } from './edit-story-panel-routing.module';
import { EditStoryMenuComponent } from './components/edit-story-panel/edit-story-menu/edit-story-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { EditChaptersMenuComponent } from './components/edit-story-panel/edit-chapters-menu/edit-chapters-menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { EditPagesMenuComponent } from './components/edit-story-panel/edit-chapters-menu/edit-pages-menu/edit-pages-menu.component';
import { EditChaptersListMenuComponent } from './components/edit-story-panel/edit-chapters-menu/edit-chapters-list/edit-chapters-list.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    EditStoryPanelComponent,
    EditStoryMenuComponent,
    EditChaptersMenuComponent,
    EditPagesMenuComponent,
    EditChaptersListMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    TranslateModule
  ],
  providers: [
    StoryService
  ]
})
export class EditStoryPanelModule { }
