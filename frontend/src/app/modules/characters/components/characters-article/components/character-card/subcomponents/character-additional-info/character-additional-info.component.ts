import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base.component';
import { CountriesService } from 'src/app/core/service/countries.service';
import { Country } from 'src/app/modules/admin-panel/models/countries/country.model';
import { Character } from 'src/app/modules/characters/models/character.model';
import { IColors } from 'src/app/modules/characters/models/colors.model';

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

    @Input() editedKey: string | null = null;
    @Output() editedKeyChange = new EventEmitter<string | null>();

    @Output() infoHasChangedEvent = new EventEmitter<true>();
    @Output() saveEvent = new EventEmitter();

    flag?: Country = undefined;
    countries: Country[] = [];

    constructor(private _countriesService: CountriesService) {
        super();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.getNationalityForCharacter();

            if (this.isUserLogged) {
                this.getCountriesList();
            }
        }, 0);
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
                        }
                    })
            );
        }
    }

    emitInfoHasChangedEvent() {
        this.infoHasChangedEvent.emit(true);
    }

    setEditedKey(value: string | null) {
        this.editedKey = value;
        this.editedKeyChange.emit(value);
    }
}
