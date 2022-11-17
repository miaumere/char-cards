import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CountriesService } from 'src/app/core/service/countries.service';
import { TagsService } from 'src/app/core/service/tags.service';
import { CharType } from 'src/app/modules/characters/enums/char-type.enum';
import { Gender } from 'src/app/modules/characters/enums/gender.enum';
import { Character } from 'src/app/modules/characters/models/character.model';
import { IColors } from 'src/app/modules/characters/models/colors.model';
import { IImageForMain } from 'src/app/modules/characters/models/image-for-main.model';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';
import { Tag } from 'src/app/modules/tags/models/tag.model';

@Component({
    selector: 'app-character-main-info [character] [fontColor]',
    templateUrl: './character-main-info.component.html',
    styleUrls: ['./character-main-info.component.scss'],
})
export class CharacterMainInfoComponent
    extends BaseComponent
    implements OnInit
{
    readonly Gender = Gender;
    readonly CharType = CharType;
    @Input() character: Character | null = null;
    @Input() fontColor: string = '';

    @Input() isUserLogged: boolean = false;
    @Input() editedKey: string | null = null;
    @Input() form = new FormGroup({});
    @Input() isNewChar = false;

    @Output() infoHasChangedEvent = new EventEmitter<true>();
    @Output() saveEvent = new EventEmitter();
    @Output() editedKeyChange = new EventEmitter<string | null>();

    filteredTagsList: Tag[] = [];
    tagsList: Tag[] = [];

    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    newTagForm = new FormGroup({
        tagToAdd: new FormControl(null),
    });

    constructor(
        private _tagsService: TagsService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.isUserLogged) {
            this.getTags();
            this.newTagForm.get('tagToAdd')?.valueChanges.subscribe((value) => {
                this._filterTags(value);
            });
        }
    }

    private _filterTags(value: string) {
        if (!value) {
            this.filteredTagsList = this.tagsList;
            return;
        }
        const regex = new RegExp(value, 'gi');

        const filteredTags = this.filteredTagsList.filter((c) => {
            return c.name.match(regex);
        });

        this.filteredTagsList = filteredTags;
    }

    addTagToCharacter(event: MatAutocompleteSelectedEvent) {
        this.newTagForm.get('tagToAdd')?.reset();
        const tag = event.option?.value;
        if (tag.id && this.character?.externalId) {
            this.subscriptions$.add(
                this._tagsService
                    .assignTagToCharacter(tag.id, this.character?.externalId)
                    .subscribe(() => {
                        this.emitInfoHasChangedEvent();
                    })
            );
        }
    }

    getTags() {
        this.subscriptions$.add(
            this._tagsService.getAllTags().subscribe((tags) => {
                const otherTags = tags.filter((x) => {
                    return !this.character?.tags.some((y) => y.id === x.id);
                });
                this.tagsList = otherTags;
                this.filteredTagsList = otherTags;
            })
        );
    }

    emitInfoHasChangedEvent() {
        this.infoHasChangedEvent.emit(true);
    }

    setEditedKey(key: string | null) {
        this.editedKey = key;
        this.editedKeyChange.emit(key);
    }

    deleteCharacterTag(tagId: number) {
        if (this.character) {
            this.subscriptions$.add(
                this._tagsService
                    .deleteCharacterTag(tagId, this.character?.externalId)
                    .subscribe(() => {
                        this.emitInfoHasChangedEvent();
                    })
            );
        }
    }
}
