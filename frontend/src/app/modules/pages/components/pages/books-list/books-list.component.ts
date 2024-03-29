import { Observable } from 'rxjs';
import { StoryService } from 'src/app/core/service/story.service';
import { BaseComponent } from 'src/app/core/base.component';
import { Component, OnInit } from '@angular/core';

import {
    BookDialogData,
    BookEditDialogComponent,
} from './book-edit-dialog/book-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';
import { Book } from '../../../models/books/book.model';

@Component({
    selector: 'app-books-list',
    templateUrl: './books-list.component.html',
    styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent extends BaseComponent {
    books$!: Observable<Book[]>;

    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    constructor(
        private _toastrService: ToastrService,
        private _translate: TranslateService,
        private _storyService: StoryService,
        public dialog: MatDialog
    ) {
        super();
        this.books$ = this._storyService.getAllBooks();
    }

    openBookDialog(book?: Book) {
        const dialogData: BookDialogData = {
            book,
        };
        const dialogRef = this.dialog.open(BookEditDialogComponent, {
            data: dialogData,
        });

        this.subscriptions$.add(
            dialogRef.afterClosed().subscribe(() => {
                this.books$ = this._storyService.getAllBooks();
            })
        );
    }

    deleteBook(id: number) {
        this.subscriptions$.add(
            this._storyService.deleteBook(id).subscribe({
                error: () => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                },
                complete: () => {
                    this.books$ = this._storyService.getAllBooks();
                },
            })
        );
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
        const books = event.container.data as unknown as NonNullable<Book>[];
        const ids = books.map((x) => x.id) as number[];

        this.subscriptions$.add(
            this._storyService.patchBookSequence(ids).subscribe(
                (_) => {
                    this.books$ = this._storyService.getAllBooks();
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
