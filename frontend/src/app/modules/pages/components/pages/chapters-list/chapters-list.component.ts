import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from 'src/app/modules/edit-story-panel/models/books/book.model';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from 'src/app/core/service/story.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ChapterRequest } from 'src/app/modules/edit-story-panel/models/chapters/edit-chapter.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as tinycolor from 'tinycolor2';
import { MatDialog } from '@angular/material/dialog';
import {
    BookDialogData,
    EditChapterDialogComponent,
} from './edit-chapter-dialog/edit-chapter-dialog.component';
import { StarringType } from 'src/app/modules/edit-story-panel/enums/StarringType.enum';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { IEditStarringCharacter } from 'src/app/modules/edit-story-panel/models/starring/edit-starring-character.model';
import { CharactersService } from 'src/app/core/service/characters.service';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';
import { Chapter } from '../../../models/chapters/chapter.model';

@Component({
    selector: 'app-chapters-list',
    templateUrl: './chapters-list.component.html',
    styleUrls: ['./chapters-list.component.scss'],
})
export class ChaptersListMenuComponent extends BaseComponent implements OnInit {
    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    isNewChapterFormVisible = true;

    chapterForm = new FormGroup({
        name: new FormControl('', Validators.required),
        chapterDesc: new FormControl('', Validators.required),
    });

    bookId: number = 0;
    book: Book | null = null;
    fontColor: string = '';

    chapters: Chapter[] = [];
    charactersList: CharacterItem[] = [];

    editedChapter: Chapter | null = null;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _storyService: StoryService,
        private _toastrService: ToastrService,
        private _translate: TranslateService,
        private _characterService: CharactersService,
        public dialog: MatDialog
    ) {
        super();
    }

    ngOnInit() {
        this._activatedRoute?.parent?.queryParams.subscribe((queryParam) => {
            this.bookId = +queryParam.id;
        });

        this.getBook();
        this.getChapters();
        this.getCharactersList();
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
        if (this.bookId)
            this.subscriptions$.add(
                this._storyService
                    .getChaptersForBook(this.bookId)
                    .subscribe((chapters) => {
                        this.chapters = chapters;

                        console.log(chapters);
                    })
            );
    }

    openChapterDialog(chapter?: Chapter) {
        const dialogData: BookDialogData = {
            chapter: chapter ?? undefined,
            bookId: this.bookId,
        };

        const dialogRef = this.dialog.open(EditChapterDialogComponent, {
            data: dialogData,
        });

        this.subscriptions$.add(
            dialogRef.afterClosed().subscribe(() => {
                this.getChapters();
            })
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

    getCharactersList() {
        this.subscriptions$.add(
            this._characterService.getCharacters().subscribe((charList) => {
                this.charactersList = charList;
            })
        );
    }

    changeVisibility(chapter: Chapter) {
        if (!chapter.id) {
            return;
        }

        this.subscriptions$.add(
            this._storyService
                .patchChapterVisibility(chapter.id, !chapter.visible)
                .subscribe(
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
