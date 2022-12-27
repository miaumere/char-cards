import { CharactersService } from 'src/app/core/service/characters.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CharacterPreferences } from 'src/app/modules/characters/models/character-preferences.model';
import {
    Character,
    ICharacter,
} from 'src/app/modules/characters/models/character.model';

@Component({
    selector: 'app-char-information [character][preferences] [form]',
    templateUrl: './char-information.component.html',
    styleUrls: ['./char-information.component.scss'],
})
export class CharInformationComponent implements OnInit {
    character: Character | null = null;

    preferences: CharacterPreferences[] = [];
    isUserLogged: boolean = false;
    form = this.charactersService.form;
    isNewChar: boolean = false;

    constructor(private charactersService: CharactersService) {}

    ngOnInit(): void {}

    changed() {
        this.charactersService.emitChange();
    }
}
