import { Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CharacterItem } from 'src/app/modules/characters/models/character-item.model';
import { BaseComponent } from 'src/app/core/base.component';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { CharType } from 'src/app/modules/characters/enums/char-type.enum';
import { TagsService } from 'src/app/core/service/tags.service';
import { combineLatest } from 'rxjs';
import { ITag } from 'src/app/modules/tags/models/tag.model';

@Component({
    selector: 'app-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent extends BaseComponent implements OnInit {
    readonly rdestUrl = '../../../../../assets/svg/rdest.svg';

    charList: CharacterItem[] = [];
    filteredChars: CharacterItem[] = [];

    tags: ITag[] = [];

    searchForm = new UntypedFormGroup({
        char: new UntypedFormControl(''),
    });

    isMain = true;
    isSide = true;
    isBackground = true;
    isPet = true;

    chosenTags: ITag[] = [];

    constructor(
        private _charactersService: CharactersService,
        private _tagsService: TagsService
    ) {
        super();
    }

    ngOnInit() {
        document.title = `Alea`;
        combineLatest([
            this._tagsService.getAssignedTags(),
            this._charactersService.getCharacters(),
        ]).subscribe(([tags, characters]) => {
            this.tags = tags;
            this.charList = characters;
            this.filteredChars = characters;
        });
    }

    setTagFilter(tag: ITag) {
        if (this.chosenTags.includes(tag)) {
            this.chosenTags = this.chosenTags.filter((t) => t.id !== tag.id);
        } else {
            this.chosenTags.push(tag);
        }

        this.searchCharacter();
    }

    searchCharacter() {
        let finalFilteredChars: CharacterItem[] = [];
        const inputValue: string = this.searchForm
            .get('char')
            ?.value.toLowerCase();

        const regex = new RegExp(inputValue, 'gi');

        const filteredChars = this.charList.filter((c) => {
            if (c.pseudonym) {
                return c.fullName.match(regex) || c.pseudonym.match(regex);
            }
            return c.fullName.match(regex);
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
        const petChars = filteredChars.filter(
            (c) => c.characterType === CharType[3]
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

        if (this.isPet && !!petChars) {
            finalFilteredChars = finalFilteredChars.concat(petChars);
        }

        const filtered: CharacterItem[] = [];

        if (this.chosenTags?.length > 0) {
            for (const character of this.charList) {
                let similarTagsNumber: number = 0;

                for (const chosenTag of this.chosenTags) {
                    if (
                        character.tags?.find((tag) => tag.id === chosenTag.id)
                    ) {
                        similarTagsNumber += 1;
                    }
                }
                if (similarTagsNumber === this.chosenTags.length) {
                    filtered.push(character);
                }
            }
            this.filteredChars = finalFilteredChars.filter((char) => {
                return !!filtered.find((f) => f.id === char.id);
            });
            return;
        }

        this.filteredChars = finalFilteredChars;
    }
}
