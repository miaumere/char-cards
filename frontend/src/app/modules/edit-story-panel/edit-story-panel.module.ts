import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  MatButtonModule, MatInputModule, MatDialogModule,
  MatTooltipModule, MatStepperModule, MatRadioModule, MatSelectModule, MatDatepickerModule,
  MatNativeDateModule, MatCheckboxModule, MatSlideToggleModule, MatSliderModule, MatAutocompleteModule,
  MatCardModule
} from '@angular/material';
import { EditStoryPanelComponent } from './components/edit-story-panel/edit-story-panel.component';
import { EditStoryPanelRoutingModule } from './edit-story-panel-routing.module';
import { EditStoryMenuComponent } from './components/edit-story-panel/edit-story-menu/edit-story-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { EditChaptersMenuComponent } from './components/edit-story-panel/edit-chapters-menu/edit-chapters-menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    EditStoryPanelComponent,
    EditStoryMenuComponent,
    EditChaptersMenuComponent
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
    MatListModule
  ],
  providers: [
  ]
})
export class EditStoryPanelModule { }
