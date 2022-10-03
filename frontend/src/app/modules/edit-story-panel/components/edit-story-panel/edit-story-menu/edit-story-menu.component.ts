import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AvailableIcons } from './../../../enums/AvailableIcons.enum';
import { StoryService } from './../../../../../core/service/story.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Book } from '../../../models/books/book.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateBook } from '../../../models/books/create-book.model';
import { EditBook } from '../../../models/books/edit-book.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';

@Component({
    selector: 'app-edit-story-menu-quotes',
    templateUrl: './edit-story-menu.component.html',
    styleUrls: ['./edit-story-menu.component.scss'],
})
export class EditStoryMenuComponent extends BaseComponent implements OnInit {
    readonly AvailableIcons = AvailableIcons;
    books: Book[] = [];

    editedBookId: number = 0;

    editMode = false;

    form = new FormGroup({
        bookName: new FormControl('', Validators.required),
        bookColor: new FormControl('#C1C1C1'),
        icon: new FormControl(),
    });

    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    constructor(
        private _storyService: StoryService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit() {
        this.getAllBooks();
    }

    getAllBooks() {
        this.subscriptions$.add(
            this._storyService.getAllBooks().subscribe((books) => {
                this.books = books;
            })
        );
    }

    createNewBook() {
        const objToSend = new CreateBook();
        objToSend.name = this.form.controls['bookName'].value;
        objToSend.color = this.form.controls['bookColor'].value;
        objToSend.icon = this.form.controls['icon'].value;
    }

    deleteBook(bookId: number) {
        this.subscriptions$.add(
            this._storyService.deleteBook(bookId).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.getAllBooks();
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    enableEditForm(book: Book) {
        this.editMode = true;
        // this.editedBookId = book.id;
        this.form.controls['bookName'].setValue(book.name);
        this.form.controls['bookColor'].setValue(book.color);
        // this.form.controls['icon'].setValue(book.icon);
    }

    editBook() {
        const objToSend = new EditBook();
        objToSend.id = this.editedBookId;
        objToSend.color = this.form.controls['bookColor'].value;
        objToSend.name = this.form.controls['bookName'].value;
        // objToSend.icon = this.form.controls['icon'].value;

        // this.subscriptions$.add(
        //     this._storyService.putEditBook(objToSend).subscribe(
        //         (_) => {
        //             this._toastrService.success(
        //                 this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
        //             );
        //             this.getAllBooks();
        //         },
        //         (err) => {
        //             this._toastrService.error(
        //                 this._translate.instant('TOASTR_MESSAGE.ERROR')
        //             );
        //         }
        //     )
        // );
    }

    drop(e: CdkDragDrop<string[]>) {
        const book = this.books[e.previousIndex];
        this.books.splice(e.previousIndex, 1);
        this.books.splice(e.currentIndex, 0, book);

        const ids: number[] = [];
        for (const key in this.books) {
            if (this.books.hasOwnProperty(key)) {
                const element = this.books[key];
                // ids.push(element.id);
            }
        }

        this._storyService.patchBookSequence(ids).subscribe(
            (_) => {
                this.getAllBooks();
            },
            (err) => {
                this._toastrService.success(
                    this._translate.instant('TOASTR_MESSAGE.ERROR')
                );
            }
        );
    }
}
