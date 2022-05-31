import { MatChipsModule } from '@angular/material/chips';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './components/tag/tag.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TagsIndexComponent } from './components/edit-tags/tags-index-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsRoutingModule } from './tags-routing.module';
import { TagsEditPanelComponent } from './components/edit-tags/subcomponents/tags-edit-panel/tags-edit-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { TagEditDialogComponent } from './components/edit-tags/subcomponents/tags-edit-panel/tag-edit-dialog/tag-edit-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        TagComponent,
        TagsIndexComponent,
        TagsEditPanelComponent,
        TagEditDialogComponent,
    ],
    exports: [TagComponent],
    imports: [
        CommonModule,
        MatChipsModule,
        SharedModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        TagsRoutingModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
})
export class TagsModule {}
