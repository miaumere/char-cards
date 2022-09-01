import {
    Book,
    IBook,
} from './../../../../../edit-story-panel/models/books/book.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base.component';
import { generateRandomColor } from 'src/app/modules/shared/functions/colors.function';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialog,
} from '@angular/material/dialog';
import {
    TagDialogData,
    TagEditDialogComponent,
} from 'src/app/modules/tags/components/edit-tags/subcomponents/tags-edit-panel/tag-edit-dialog/tag-edit-dialog.component';
import { StoryService } from 'src/app/core/service/story.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

export interface BookDialogData {
    book?: Book;
}

const emojis = [
    '💀',
    '👽',
    '🔥',
    '✨',
    '🌟',
    '💫',
    '💥',
    '💢',
    '💦',
    '💧',
    '🎄',
    '🎁',
    '🎋',
    '🎉',
    '🎊',
    '🎈',
    '🎌',
];

const getRandomEmoji = () => {
    return emojis[Math.floor(Math.random() * emojis.length)];
};

@Component({
    selector: 'app-book-edit-dialog',
    templateUrl: './book-edit-dialog.component.html',
    styleUrls: ['./book-edit-dialog.component.scss'],
})
export class BookEditDialogComponent extends BaseComponent implements OnInit {
    bookForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        color: new FormControl(generateRandomColor()),
        symbol: new FormControl(getRandomEmoji()),
    });

    constructor(
        private _storyService: StoryService,
        private _toastrService: ToastrService,
        private _translate: TranslateService,
        @Inject(MAT_DIALOG_DATA) public data: BookDialogData,
        public dialogRef: MatDialogRef<BookEditDialogComponent>,
        public dialog: MatDialog
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.data.book) {
            this.bookForm.get('name')?.patchValue(this.data.book?.name);
            this.bookForm.get('color')?.patchValue(this.data.book?.color);
            this.bookForm.get('symbol')?.patchValue(this.data.book?.symbol);
        }
    }

    saveBook() {
        const request: IBook = {
            id: this.data.book?.id ?? null,
            name: this.bookForm.get('name')?.value,
            color: this.bookForm.get('color')?.value,
            symbol: this.bookForm.get('symbol')?.value,
            bookOrder: this.data.book?.bookOrder ?? null,
        };
        this.subscriptions$.add(
            this._storyService.upsertBook(request).subscribe(() => {
                this.dialog.closeAll();
            })
        );
    }

    deleteBook() {
        if (!!this.data.book && !!this.data.book?.id) {
            this.subscriptions$.add(
                this._storyService.deleteBook(this.data.book?.id).subscribe({
                    error: () => {
                        this._toastrService.error(
                            this._translate.instant('TOASTR_MESSAGE.ERROR')
                        );
                    },
                    complete: () => {
                        this.dialog.closeAll();
                    },
                })
            );
        }
    }
}
