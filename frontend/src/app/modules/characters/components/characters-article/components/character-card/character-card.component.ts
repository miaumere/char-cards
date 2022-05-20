import { IColors } from './../../../../models/colors.model';
import { CharacterPreferences } from './../../../../models/character-preferences.model';
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    SimpleChanges,
} from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Character } from 'src/app/modules/characters/models/character.model';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from 'src/app/core/service/characters.service';

@Component({
    selector:
        'app-character-card [character] [themeColor] [bgColorFirst] [bgColorSecond] [preferences] [isUserLogged]',
    templateUrl: './character-card.component.html',
    styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent extends BaseComponent implements OnInit {
    @Input() character: Character | null = null;

    @Input('themeColor') themeColor1 = '';
    @Input('bgColorFirst') bgColor1 = '';
    @Input('bgColorSecond') bgColor2 = '';

    @Input() preferences: CharacterPreferences[] = [];

    @Output() characterHadChangedEvent = new EventEmitter();

    @Input() isUserLogged = false;

    form = new FormGroup({});

    editedKey: string | null = null;

    constructor(
        private _charactersService: CharactersService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes.hasOwnProperty('isUserLogged') ||
            changes.hasOwnProperty('character')
        ) {
            if (this.isUserLogged && this.character) {
                for (const key in this.character) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            this.character,
                            key
                        )
                    ) {
                        const untypedChar = this.character as any;
                        const element = untypedChar[key];

                        if (key === 'colors') {
                            for (const colorKey in element) {
                                if (
                                    Object.prototype.hasOwnProperty.call(
                                        element,
                                        colorKey
                                    )
                                ) {
                                    const colorElement = element[colorKey];
                                    this.form.addControl(
                                        colorKey,
                                        new FormControl(colorElement)
                                    );
                                }
                            }
                        }

                        this.form.addControl(key, new FormControl(element));
                    }
                }
            }
        }
    }

    changed() {
        this.characterHadChangedEvent.emit();
    }

    clicked(key: string) {
        this.editedKey = null;
        if (this.character) {
            const keys = Object.keys(this.character);
            if (keys.includes(key)) {
                this.editedKey = key;
            }
        }
    }

    saveCharacter() {
        console.log('form value: ', this.form.value);
        const request = this.form.value;
        const colors: IColors = {
            eyeColor1: this.form.get('eyeColor1')?.value,
            eyeColor2: this.form.get('eyeColor2')?.value,
            themeColor1: this.form.get('themeColor1')?.value,
            themeColor2: this.form.get('themeColor2')?.value,
            themeColor3: this.form.get('themeColor3')?.value,
            hairColor: this.form.get('hairColor')?.value,
            skinColor: this.form.get('skinColor')?.value,
        };

        request.colors = colors;

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
                        this.characterHadChangedEvent.emit();
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
