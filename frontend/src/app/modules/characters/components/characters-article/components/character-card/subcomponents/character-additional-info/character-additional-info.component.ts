import { TagsService } from 'src/app/core/service/tags.service';
import { Tag } from 'src/app/modules/tags/models/tag.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base.component';
import { CountriesService } from 'src/app/core/service/countries.service';
import { Character } from 'src/app/modules/characters/models/character.model';
import { Country } from 'src/app/modules/characters/models/countries/country.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';

@Component({
    selector: 'app-character-additional-info',
    templateUrl: './character-additional-info.component.html',
    styleUrls: ['./character-additional-info.component.scss'],
})
export class CharacterAdditionalInfoComponent
    extends BaseComponent
    implements OnInit
{
    readonly analysts = ['INTJ', 'INTP', 'ENTJ', 'ENTP'];
    readonly diplomats = ['INFJ', 'INFP', 'ENFJ', 'ENFP'];
    readonly sentinels = ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'];
    readonly explorers = ['ISTP', 'ISFP', 'ESTP', 'ESFP'];

    @Input() isUserLogged: boolean = false;
    @Input() character: Character | null = null;
    @Input() form = new UntypedFormGroup({});
    @Input('color') themeColor1: string = '';

    @Input() editedKey: string | null = null;
    @Output() editedKeyChange = new EventEmitter<string | null>();

    @Output() infoHasChangedEvent = new EventEmitter<true>();
    @Output() saveEvent = new EventEmitter();

    flag?: Country = undefined;
    originalFlag?: Country = undefined;
    countries: Country[] = [];

    insertDeleteInfo = () =>
        insertDeleteInfo(this._toastrService, this._translate);

    constructor(
        private _countriesService: CountriesService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {
        this.getNationalityForCharacter();

        if (this.isUserLogged) {
            this.getCountriesList();
        }
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

    getColorForMbti(mbti: string): string {
        const mbtiUppercase = mbti.toUpperCase();
        if (this.analysts.some((x) => mbtiUppercase.includes(x))) {
            return '#88619a';
        }
        if (this.diplomats.some((x) => mbtiUppercase.includes(x))) {
            return '#33a474';
        }
        if (this.sentinels.some((x) => mbtiUppercase.includes(x))) {
            return '#4298b4';
        }
        if (this.explorers.some((x) => mbtiUppercase.includes(x))) {
            return '#e4ae3a';
        }

        return 'whitesmoke';
    }
}
