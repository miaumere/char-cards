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

@NgModule({
  declarations: [
    EditStoryPanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditStoryPanelRoutingModule,
    ReactiveFormsModule,
    SharedModule,
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
    MatCardModule
  ],
  providers: [
  ]
})
export class EditStoryPanelModule { }
