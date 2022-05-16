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
    ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CountriesService } from 'src/app/core/service/countries.service';
import { Country } from 'src/app/modules/admin-panel/models/countries/country.model';
import { Character } from 'src/app/modules/characters/models/character.model';
import { IColors } from 'src/app/modules/characters/models/colors.model';
import { IImageForMain } from 'src/app/modules/characters/models/image-for-main.model';

@Component({
    selector:
        'app-character-main-info [character] [color] [bgColor] [bgColorSecond]',
    templateUrl: './character-main-info.component.html',
    styleUrls: ['./character-main-info.component.scss'],
})
export class CharacterMainInfoComponent
    extends BaseComponent
    implements OnInit
{
    @Input() character: Character | null = null;
    @Input('color') themeColor1: string = '';
    @Input('bgColor') bgColor1: string = '';
    @Input('bgColorSecond') bgColor2: string = '';
    @Input() isUserLogged: boolean = false;

    @Output() infoHasChangedEvent = new EventEmitter<true>();

    flag?: Country = undefined;
    countries: Country[] = [];

    editedKey: string | null = null;

    form = new FormGroup({});

    get hasTemperamentInfo(): boolean {
        return !!(
            this.character?.temperament?.melancholic ||
            this.character?.temperament?.sanguine ||
            this.character?.temperament?.flegmatic ||
            this.character?.temperament?.choleric
        );
    }

    constructor(
        private _countriesService: CountriesService,
        private _charactersService: CharactersService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit(): void {
        this.getNationalityForCharacter();

        if (this.isUserLogged) {
            this.getCountriesList();

            if (this.character) {
                Object.keys(this.character);
                for (const key in this.character) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            this.character,
                            key
                        )
                    ) {
                        const untypedChar = this.character as any;
                        const element = untypedChar[key];

                        this.form.addControl(key, new FormControl(element));

                        console.log(this.form);
                    }
                }
            }
        }
    }

    emitInfoHasChangedEvent() {
        this.infoHasChangedEvent.emit(true);
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

    getLinearGradientForEyeColor(colors: IColors) {
        return {
            'background-image': `linear-gradient(to right, ${colors.eyeColor1} 75%,  ${colors.eyeColor2} 75%,  ${colors.eyeColor2})`,
        };
    }

    getCountriesList() {
        this.subscriptions$.add(
            this._countriesService.getCountries().subscribe((countries) => {
                this.countries = countries;
            })
        );
    }

    clicked(key: string) {
        this.editedKey = null;
        if (this.character) {
            const keys = Object.keys(this.character);
            console.log('keys: ', keys);

            if (keys.includes(key)) {
                this.editedKey = key;
            }
        }
    }

    saveCharacter() {
        this.subscriptions$.add(
            this._charactersService
                .putCharacterDetails(this.form.value, false)
                .subscribe(
                    (_) => {
                        this._toastrService.success(
                            this._translate.instant(
                                'TOASTR_MESSAGE.SAVE_SUCCESS'
                            )
                        );

                        this.infoHasChangedEvent.emit(true);
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
