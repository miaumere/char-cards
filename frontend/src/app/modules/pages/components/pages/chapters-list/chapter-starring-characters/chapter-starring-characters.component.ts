import { Chapter } from './../../../../models/chapters/chapter.model';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';
import { BaseComponent } from 'src/app/core/base.component';
import { StoryService } from 'src/app/core/service/story.service';
import { StarringType } from 'src/app/modules/edit-story-panel/enums/StarringType.enum';
import { IEditStarringCharacter } from 'src/app/modules/edit-story-panel/models/starring/edit-starring-character.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { CharactersService } from 'src/app/core/service/characters.service';

@Component({
    selector:
        'app-chapter-starring-characters [fontColor] [index] [chapter] [charactersList]',
    templateUrl: './chapter-starring-characters.component.html',
    styleUrls: ['./chapter-starring-characters.component.scss'],
})
export class ChapterStarringCharactersComponent
    extends BaseComponent
    implements OnInit
{
    readonly StarringType = StarringType;

    @Input() fontColor: string = '';
    @Input() index: number = 0;
    @Input() chapter!: Chapter;

    @Output() infoHasChangedEvent = new EventEmitter();

    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    charactersInChapterForm = new FormGroup({
        character: new FormControl('', Validators.required),
        starringType: new FormControl('', Validators.required),
    });

    @Input() charactersList: CharacterItem[] = [];
    filteredCharList: CharacterItem[] = [];

    editedCharacterId: number = 0;

    openedPanelId: number | null = null;

    constructor(
        private _storyService: StoryService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {
        this.charactersInChapterForm.get('character')?.reset();

        this.charactersInChapterForm
            .get('character')
            ?.valueChanges.subscribe((value) => {
                this._filterCharacters(value);
            });

        this.filteredCharList = this.charactersList;
    }

    private _filterCharacters(value: string) {
        if (!value) {
            this.filteredCharList = this.charactersList;
            return;
        }
        const regex = new RegExp(value, 'gi');

        if (!!this.filteredCharList.length) {
            const filteredChars = this.filteredCharList.filter((c) => {
                if (c.pseudonym) {
                    return c.fullName.match(regex) || c.pseudonym.match(regex);
                }

                return c.fullName.match(regex);
            });
            this.filteredCharList = filteredChars;
        } else {
            this.filteredCharList = [];
        }
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
                    this.infoHasChangedEvent.emit();
                },
                () => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }

    setCharacters(panelId: number) {
        this.openedPanelId = panelId;
    }

    deleteStarringCharacter(starringId: number) {
        this.subscriptions$.add(
            this._storyService.deleteCharFromChapter(starringId).subscribe(
                (_) => {
                    this._toastrService.success(
                        this._translate.instant('TOASTR_MESSAGE.SAVE_SUCCESS')
                    );
                    this.infoHasChangedEvent.emit();
                },
                () => {
                    this._toastrService.error(
                        this._translate.instant('TOASTR_MESSAGE.ERROR')
                    );
                }
            )
        );
    }
}
