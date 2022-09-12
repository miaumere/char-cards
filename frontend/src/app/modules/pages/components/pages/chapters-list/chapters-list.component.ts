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

@Component({
    selector: 'app-chapters-list',
    templateUrl: './chapters-list.component.html',
    styleUrls: ['./chapters-list.component.scss'],
})
export class ChaptersListMenuComponent extends BaseComponent implements OnInit {
    readonly StarringType = StarringType;

    isNewChapterFormVisible = true;

    chapterForm = new FormGroup({
        name: new FormControl('', Validators.required),
        chapterDesc: new FormControl('', Validators.required),
    });
    charactersInChapterForm = new FormGroup({
        character: new FormControl('', Validators.required),
        starringType: new FormControl('', Validators.required),
    });
    bookId: number = 0;
    book: Book | null = null;
    fontColor: string = '';

    chapters: Chapter[] = [];

    editedCharacterId: number = 0;

    editedChapter: Chapter | null = null;

    charList: CharacterItem[] = [];
    filteredCharList: CharacterItem[] = [];

    openedPanelId: number | null = null;

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

    setCharacters(panelId: number) {
        this.openedPanelId = panelId;
        this.charactersInChapterForm.get('character')?.reset();

        this.charactersInChapterForm
            .get('character')
            ?.valueChanges.subscribe((value) => {
                this._filterCharacters(value);
            });
    }
    private _filterCharacters(value: string) {
        if (!value) {
            this.filteredCharList = this.charList;
            return;
        }
        const regex = new RegExp(value, 'gi');

        const filteredChars = this.filteredCharList.filter((c) => {
            if (c.pseudonym) {
                return c.fullName.match(regex) || c.pseudonym.match(regex);
            }

            return c.fullName.match(regex);
        });

        this.filteredCharList = filteredChars;
    }

    getCharactersList() {
        this.subscriptions$.add(
            this._characterService.getCharacters().subscribe((charList) => {
                this.charList = charList;
                this.filteredCharList = charList;
            })
        );
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

    isCharacterStarring(char: CharacterItem, chapter: Chapter): boolean {
        return !!chapter.starringChars.find((x) => x.character?.id === char.id);
    }

    createStarringCharacter(chapterId: number) {
        const objToSend: IEditStarringCharacter = {
            id: this.editedCharacterId ? +this.editedCharacterId : null,
            characterId:
                this.charactersInChapterForm.get('character')?.value.id,

            chapterId: chapterId,
            starringType:
                StarringType[
                    this.charactersInChapterForm.get('starringType')?.value
                ],
        };

        this.subscriptions$.add(
            this._storyService.postStarringCharacters(objToSend).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.charactersInChapterForm.reset();
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

    deleteStarringCharacter(starringId: number) {
        this.subscriptions$.add(
            this._storyService.deleteCharFromChapter(starringId).subscribe(
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
}
