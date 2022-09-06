import { Component, Inject, OnInit } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialog,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { StoryService } from 'src/app/core/service/story.service';
import {
    BookDialogData,
    BookEditDialogComponent,
} from 'src/app/modules/pages/components/pages/books-list/book-edit-dialog/book-edit-dialog.component';

@Component({
    selector: 'app-edit-chapter-dialog',
    templateUrl: './edit-chapter-dialog.component.html',
    styleUrls: ['./edit-chapter-dialog.component.scss'],
})
export class EditChapterDialogComponent
    extends BaseComponent
    implements OnInit
{
    constructor(
        private _storyService: StoryService,
        private _toastrService: ToastrService,
        private _translate: TranslateService,
        @Inject(MAT_DIALOG_DATA) public data: BookDialogData,
        public dialogRef: MatDialogRef<EditChapterDialogComponent>,
        public dialog: MatDialog
    ) {
        super();
    }

    ngOnInit(): void {}
}
