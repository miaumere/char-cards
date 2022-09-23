import { TranslateService } from '@ngx-translate/core';
import { StarringType } from './../../../../enums/StarringType.enum';
import {
    StarringCharacter,
    IStarringCharacter,
} from './../../../../models/starring/starring-character.model';
import { CharactersService } from './../../../../../../core/service/characters.service';
import { ToastrService } from 'ngx-toastr';
import { StoryService } from 'src/app/core/service/story.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';

import * as tinycolor from 'tinycolor2';
import { Page } from 'src/app/modules/pages/models/pages/page.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IEditStarringCharacter } from 'src/app/modules/edit-story-panel/models/starring/edit-starring-character.model';

@Component({
    selector: 'app-edit-pages-menu',
    templateUrl: './edit-pages-menu.component.html',
    styleUrls: ['./edit-pages-menu.component.scss'],
})
export class EditPagesMenuComponent extends BaseComponent implements OnInit {
    readonly pageURL = '/api/stories/get-images';
    readonly StarringType = StarringType;

    fontColor = 'white';
    bookColor: string = '';
    bookId: number = 0;

    pagesNumber: number[] = [];

    filesListNumber = 0;
    fileList: FileList | undefined;

    chapterId: number = 0;

    editedCharacterId: number = 0;

    charactersInChapterForm = new FormGroup({
        character: new FormControl('', Validators.required),
        starringType: new FormControl('', Validators.required),
    });

    charList: CharacterItem[] = [];
    filteredCharList: CharacterItem[] = [];

    starringCharacters: StarringCharacter[] = [];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _storyService: StoryService,
        private _toastrService: ToastrService,
        private _characterService: CharactersService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit() {
        this._activatedRoute?.parent?.queryParams.subscribe((queryParam) => {
            this.chapterId = +queryParam.chapterId;
            const bookColor = tinycolor(queryParam.color);
            this.bookColor =
                '' + (bookColor.isLight() ? bookColor : bookColor.lighten(35));

            this.fontColor = tinycolor(bookColor).isLight() ? 'black' : 'white';

            this.bookId = +queryParam.id;
            this.getChapter(this.chapterId);
        });
    }
    getChapter(id: number) {
        this.subscriptions$.add(
            this._storyService
                .getChaptersForBook(this.bookId)
                .pipe(map((arr) => arr.find((x) => x.id === id)))
                .subscribe((chapter) => {
                    if (chapter?.pagesIds) {
                        this.pagesNumber = chapter.pagesIds;
                    }
                })
        );
    }

    insertDeleteInfo() {
        this._toastrService.warning(
            this._translate.instant('TOASTR_MESSAGE.DBLCLICK_INFO')
        );
    }

    onFileInput(fileList: FileList) {
        this.fileList = fileList;
        this.filesListNumber = fileList.length;
    }

    drop(e: CdkDragDrop<string[]>) {
        const number = this.pagesNumber[e.previousIndex];
        this.pagesNumber.splice(e.previousIndex, 1);
        this.pagesNumber.splice(e.currentIndex, 0, number);

        const ids: number[] = [];
        for (const key in this.pagesNumber) {
            if (this.pagesNumber.hasOwnProperty(key)) {
                const element = this.pagesNumber[key];
                ids.push(element);
            }
        }

        this.subscriptions$.add(
            this._storyService.patchPageSequence(ids, this.chapterId).subscribe(
                (_) => {
                    this.getChapter(this.chapterId);
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    addNewPages() {
        const formData = new FormData();
        if (this.fileList) {
            for (let i = 0; i < this.fileList.length; i++) {
                formData.append('image' + i, this.fileList[i]);
            }
        }

        this.subscriptions$.add(
            this._storyService.postPages(formData, this.chapterId).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.getChapter(this.chapterId);
                },
                (err) => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    deletePage(pageId: number) {
        this.subscriptions$.add(
            this._storyService.deletePage(pageId).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.getChapter(this.chapterId);
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
