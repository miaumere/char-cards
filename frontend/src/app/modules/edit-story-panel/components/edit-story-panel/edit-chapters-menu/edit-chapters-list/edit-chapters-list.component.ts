import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from 'src/app/modules/edit-story-panel/models/books/book.model';
import { Chapter } from 'src/app/modules/edit-story-panel/models/chapters/chapter.model';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from 'src/app/core/service/story.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { EditChapter } from 'src/app/modules/edit-story-panel/models/chapters/edit-chapter.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as tinycolor from 'tinycolor2';

@Component({
    selector: 'app-edit-chapters-list',
    templateUrl: './edit-chapters-list.component.html',
    styleUrls: ['./edit-chapters-list.component.scss'],
})
export class EditChaptersListMenuComponent
    extends BaseComponent
    implements OnInit
{
    isNewChapterFormVisible = true;

    chapterForm = new FormGroup({
        name: new FormControl('', Validators.required),
        chapterDesc: new FormControl('', Validators.required),
    });

    bookId: number = 0;
    book: Book | null = null;
    fontColor: string = '';

    chapters: Chapter[] = [];

    editedChapter: Chapter | null = null;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _storyService: StoryService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit() {
        this._activatedRoute?.parent?.queryParams.subscribe((queryParam) => {
            this.bookId = +queryParam.id;
        });

        this.getBook();
        this.getChapters();
    }

    getBook() {
        this.subscriptions$.add(
            this._storyService
                .getAllBooks()
                .pipe(map((arr) => arr.find((x) => x.id === this.bookId)))
                .subscribe((book) => {
                    if (book) {
                        this.book = book;
                        const bookColor = tinycolor(book?.color);

                        this.fontColor =
                            '' +
                            (bookColor.isLight()
                                ? bookColor
                                : bookColor.lighten(35));
                    }
                })
        );
    }

    getChapters() {
        this.subscriptions$.add(
            this._storyService
                .getChaptersForBook(this.bookId)
                .subscribe((chapters) => {
                    this.chapters = chapters;
                })
        );
    }

    insertNewChapterForm() {
        this.isNewChapterFormVisible = true;
    }

    createNewChapter() {
        this.editedChapter = null;
        const objToSend: EditChapter = {
            id: null,
            chapterDesc: this.chapterForm.get('chapterDesc')?.value,
            name: this.chapterForm.get('name')?.value,
            bookId: this.bookId,
        };

        this.subscriptions$.add(
            this._storyService.editChapter(objToSend).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.chapterForm.reset();
                    this.getChapters();
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    editChapter() {
        if (this.editedChapter) {
            const objToSend: EditChapter = {
                id: this.editedChapter.id,
                chapterDesc: this.chapterForm.get('chapterDesc')?.value,
                name: this.chapterForm.get('name')?.value,
                bookId: this.bookId,
            };

            this.subscriptions$.add(
                this._storyService.editChapter(objToSend).subscribe(
                    (_) => {
                        this._toastrService.success(
                            this._translate.instant(
                                'TOASTR_MESSAGE.SAVE_SUCCESS'
                            )
                        );
                        this.getChapters();
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

    insertEditInfoToForm(chapter: Chapter) {
        this.chapterForm.get('chapterDesc')?.setValue(chapter.chapterDesc);
        this.chapterForm.get('name')?.setValue(chapter.name);

        this.editedChapter = chapter;
    }

    insertDeleteInfo() {
        this._toastrService.warning(
            this._translate.instant('TOASTR_MESSAGE.DELETE_INFO')
        );
    }

    deleteChapter(id: number) {
        this.subscriptions$.add(
            this._storyService.deleteChapter(id).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.getChapters();
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    drop(e: CdkDragDrop<string[]>) {
        const chapter = this.chapters[e.previousIndex];
        this.chapters.splice(e.previousIndex, 1);
        this.chapters.splice(e.currentIndex, 0, chapter);

        const ids: any[] = [];
        for (const key in this.chapters) {
            if (this.chapters.hasOwnProperty(key)) {
                const element = this.chapters[key];
                ids.push(element.id);
            }
        }
        this.subscriptions$.add(
            this._storyService.patchChapterSequence(ids, this.bookId).subscribe(
                (_) => {
                    this.getChapters();
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
