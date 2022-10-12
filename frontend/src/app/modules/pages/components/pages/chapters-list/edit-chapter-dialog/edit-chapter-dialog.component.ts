import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialog,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { StoryService } from 'src/app/core/service/story.service';
import { ChapterRequest } from 'src/app/modules/edit-story-panel/models/chapters/edit-chapter.model';
import { Book } from 'src/app/modules/pages/models/books/book.model';
import { Chapter } from 'src/app/modules/pages/models/chapters/chapter.model';

export interface BookDialogData {
    chapter?: Chapter;
    book: Book;
}

@Component({
    selector: 'app-edit-chapter-dialog',
    templateUrl: './edit-chapter-dialog.component.html',
    styleUrls: ['./edit-chapter-dialog.component.scss'],
})
export class EditChapterDialogComponent
    extends BaseComponent
    implements OnInit
{
    chapterForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        chapterDesc: new FormControl('', Validators.required),
        book: new FormControl(null),
        actionTime: new FormControl(''),
        actionPlace: new FormControl(''),
    });

    books: Book[] = [];

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

    ngOnInit(): void {
        console.log('ogór');
        if (this.data.chapter) {
            this.getBooks();

            this.chapterForm.get('name')?.patchValue(this.data.chapter?.name);
            this.chapterForm
                .get('chapterDesc')
                ?.patchValue(this.data.chapter?.chapterDesc);
            this.chapterForm
                .get('actionPlace')
                ?.patchValue(this.data.chapter?.actionPlace);
            this.chapterForm
                .get('actionTime')
                ?.patchValue(this.data.chapter?.actionTime);

            this.chapterForm.get('book')?.patchValue(this.data.book.id);
        }
    }

    getBooks() {
        this.subscriptions$.add(
            this._storyService
                .getAllBooks()
                .pipe()
                .subscribe((books) => {
                    this.books = books;
                })
        );
    }

    upsertChapter() {
        const chapter: Partial<ChapterRequest> = {
            id: this.data?.chapter?.id ?? null,
            bookId: this.chapterForm.get('book')?.value.id,
            name: this.chapterForm.get('name')?.value,
            chapterDesc: this.chapterForm.get('chapterDesc')?.value,
            actionTime: this.chapterForm.get('actionTime')?.value,
            actionPlace: this.chapterForm.get('actionPlace')?.value,
        };

        this.subscriptions$.add(
            this._storyService.upsertChapter(chapter).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.dialogRef.close();
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }
}
