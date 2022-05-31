import { TagsService } from 'src/app/core/service/tags.service';
import { Tag } from 'src/app/modules/tags/models/tag.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base.component';
import { CountriesService } from 'src/app/core/service/countries.service';
import { Character } from 'src/app/modules/characters/models/character.model';
import { Country } from 'src/app/modules/characters/models/countries/country.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-character-additional-info',
    templateUrl: './character-additional-info.component.html',
    styleUrls: ['./character-additional-info.component.scss'],
})
export class CharacterAdditionalInfoComponent
    extends BaseComponent
    implements OnInit
{
    @Input() isUserLogged: boolean = false;
    @Input() character: Character | null = null;
    @Input() form = new FormGroup({});
    @Input('color') themeColor1: string = '';

    @Input() editedKey: string | null = null;
    @Output() editedKeyChange = new EventEmitter<string | null>();

    @Output() infoHasChangedEvent = new EventEmitter<true>();
    @Output() saveEvent = new EventEmitter();

    flag?: Country = undefined;
    originalFlag?: Country = undefined;
    countries: Country[] = [];

    newTagForm = new FormGroup({
        tagToAdd: new FormControl(null),
    });

    filteredTagsList: Tag[] = [];
    tagsList: Tag[] = [];

    constructor(
        private _countriesService: CountriesService,
        private _tagsService: TagsService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {
        this.getNationalityForCharacter();

        if (this.isUserLogged) {
            this.getCountriesList();

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

    getCountriesList() {
        this.subscriptions$.add(
            this._countriesService.getCountries().subscribe((countries) => {
                this.countries = countries;
            })
        );
    }

    get hasTemperamentInfo(): boolean {
        return !!(
            this.character?.temperament?.melancholic ||
            this.character?.temperament?.sanguine ||
            this.character?.temperament?.flegmatic ||
            this.character?.temperament?.choleric
        );
    }

    getNationalityForCharacter() {
        if (this.character?.nationality) {
            this.subscriptions$.add(
                this._countriesService
                    .getFlagByCode(this.character.nationality)
                    .subscribe((flag) => {
                        if (flag) {
                            this.flag = flag;
                            this.originalFlag = flag;
                        }
                    })
            );
        }
    }

    emitInfoHasChangedEvent() {
        this.infoHasChangedEvent.emit(true);
    }

    setEditedKey(key: string | null) {
        this.editedKey = key;
        this.flag = this.originalFlag;
        this.editedKeyChange.emit(key);
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

    insertDeleteInfo() {
        this._toastrService.warning(
            this._translate.instant('TOASTR_MESSAGE.DELETE_INFO')
        );
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
}
