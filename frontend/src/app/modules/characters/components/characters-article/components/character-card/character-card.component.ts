import { CharacterPreferences } from './../../../../models/character-preferences.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { Character } from 'src/app/modules/characters/models/character.model';
import { FormGroup } from '@angular/forms';
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

    ngOnInit() {
        // this.subscriptions$.add(
        //   this.editedKey.subscribe().
        // )
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

                console.log('key: ', this.editedKey);
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
