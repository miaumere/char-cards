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

@NgModule({
  declarations: [
    EditStoryPanelComponent,
    EditStoryMenuComponent
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
    MatIconModule
  ],
  providers: [
  ]
})
export class EditStoryPanelModule { }
