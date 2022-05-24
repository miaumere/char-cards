import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/base.component';
import { FormGroup, FormControl } from '@angular/forms';
import { CharType } from 'src/app/modules/admin-panel/enums/character-type.enum';

@Component({
    selector: 'app-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent extends BaseComponent implements OnInit {
    readonly rdestUrl = '../../../../../assets/svg/rdest.svg';
    charList: CharacterItem[] = [];
    filteredChars: CharacterItem[] = [];

    searchForm = new FormGroup({
        char: new FormControl(''),
    });

    isMain = true;
    isSide = true;
    isBackground = true;

    constructor(private _charactersService: CharactersService) {
        super();
    }

    ngOnInit() {
        this.subscriptions$.add(
            this._charactersService.getAllCharacters().subscribe((charList) => {
                let charactersList: CharacterItem[] = [];

                const mainCharacters = charList?.filter(
                    (x) => x.characterType === 'MAIN'
                );

                const sideCharacters = charList?.filter(
                    (x) => x.characterType === 'SIDE'
                );

                const bgCharacters = charList?.filter(
                    (x) => x.characterType === 'BACKGROUND'
                );

                if (!!mainCharacters) {
                    charactersList = mainCharacters;
                }

                if (!!sideCharacters) {
                    charactersList = charactersList.concat(sideCharacters);
                }
                if (!!bgCharacters) {
                    charactersList = charactersList.concat(bgCharacters);
                }

                this.charList = charactersList;
                this.filteredChars = charactersList;
            })
        );
    }

    searchCharacter() {
        let finalFilteredChars: CharacterItem[] = [];
        const inputValue: string =
            '' + this.searchForm.get('char')?.value.toLowerCase();
        const regex = new RegExp(inputValue, 'gi');

        const filteredChars = this.charList.filter((c) => {
            return c.fullName.match(regex) || c.pseudonym.match(regex);
        });

        const mainChars = filteredChars.filter(
            (c) => c.characterType === CharType[0]
        );
        const sideChars = filteredChars.filter(
            (c) => c.characterType === CharType[1]
        );
        const bgChars = filteredChars.filter(
            (c) => c.characterType === CharType[2]
        );

        if (this.isMain && !!mainChars) {
            finalFilteredChars = mainChars;
        }
        if (this.isSide && !!sideChars) {
            finalFilteredChars = finalFilteredChars.concat(sideChars);
        }
        if (this.isBackground && !!bgChars) {
            finalFilteredChars = finalFilteredChars.concat(bgChars);
        }
        this.filteredChars = finalFilteredChars;
    }
}
