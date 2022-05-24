import { TranslateService } from '@ngx-translate/core';
import { CharacterForChange } from '../../models/character-for-change.model';
import { ToastrService } from 'ngx-toastr';
import { CharactersService } from '../../../../core/service/characters.service';
import { Component, OnInit } from '@angular/core';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { finalize } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-admin-panel-for-characters',
    templateUrl: './admin-panel-for-characters.component.html',
    styleUrls: ['./admin-panel-for-characters.component.scss'],
})
export class AdminPanelForCharactersComponent
    extends BaseComponent
    implements OnInit
{
    charList: CharacterItem[] = [];
    filteredChars: CharacterItem[] = [];

    searchForm = new FormGroup({
        char: new FormControl(''),
    });

    constructor(
        private _charactersService: CharactersService,
        private _toastrService: ToastrService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit() {
        this.getAllCharacters();
    }

    getAllCharacters() {
        this.subscriptions$.add(
            this._charactersService.getCharacters().subscribe((charList) => {
                const archivedCharacters = charList.filter((x) => x.archived);
                const nonArchivedCharcaters = charList.filter(
                    (x) => !x.archived
                );
                this.charList =
                    nonArchivedCharcaters.concat(archivedCharacters);
                this.filteredChars =
                    nonArchivedCharcaters.concat(archivedCharacters);
            })
        );
    }

    changeStateOfChar(id: number) {
        const matchingChar = this.charList.find((c) => c.id === id);
        if (matchingChar) {
            this.subscriptions$.add(
                this._charactersService
                    .patchCharacterState(
                        new CharacterForChange(id, !matchingChar.archived)
                    )
                    .subscribe(
                        (_) => {
                            this._toastrService.success(
                                this._translate.instant(
                                    'TOASTR_MESSAGE.SAVE_SUCCESS'
                                )
                            );
                            this.getAllCharacters();
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

    searchCharacter() {
        const inputValue: string =
            '' + this.searchForm.get('char')?.value.toLowerCase();
        const regex = new RegExp(inputValue, 'gi');

        const filteredChars = this.charList.filter((c) => {
            return c.fullName.match(regex);
        });
        this.filteredChars = filteredChars;
    }
}
