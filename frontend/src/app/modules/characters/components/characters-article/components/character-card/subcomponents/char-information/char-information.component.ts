import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CharacterPreferences } from 'src/app/modules/characters/models/character-preferences.model';
import { Character } from 'src/app/modules/characters/models/character.model';

@Component({
    selector:
        'app-char-information [character] [color] [bgColor] [preferences]',
    templateUrl: './char-information.component.html',
    styleUrls: ['./char-information.component.scss'],
})
export class CharInformationComponent implements OnInit {
    @Input() character: Character | null = null;
    @Input('color') themeColor1: string = '';
    @Input('bgColor') bgColor1: string = '';

    @Input() preferences: CharacterPreferences[] = [];
    @Input() isUserLogged: boolean = false;

    @Output() infoHasChangedEvent = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    emitInfoHasChangedEvent() {
        this.infoHasChangedEvent.emit();
    }
}
