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
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CountriesService } from 'src/app/core/service/countries.service';
import { TagsService } from 'src/app/core/service/tags.service';
import { CharType } from 'src/app/modules/characters/enums/char-type.enum';
import { Gender } from 'src/app/modules/characters/enums/gender.enum';
import { Character } from 'src/app/modules/characters/models/character.model';
import { IColors } from 'src/app/modules/characters/models/colors.model';
import { IImageForMain } from 'src/app/modules/characters/models/image-for-main.model';
import { insertDeleteInfo } from 'src/app/modules/shared/functions/insert-delete.info';
import { Tag } from 'src/app/modules/tags/models/tag.model';

@Component({
    selector: 'app-character-main-info [character] [fontColor]',
    templateUrl: './character-main-info.component.html',
    styleUrls: ['./character-main-info.component.scss'],
})
export class CharacterMainInfoComponent
    extends BaseComponent
    implements OnInit
{
    readonly Gender = Gender;
    readonly CharType = CharType;
    @Input() character: Character | null = null;
    @Input() fontColor: string = '';

    @Input() isUserLogged: boolean = false;
    @Input() editedKey: string | null = null;
    @Input() form = new FormGroup({});
    @Input() isNewChar = false;

    @Output() infoHasChangedEvent = new EventEmitter<true>();
    @Output() saveEvent = new EventEmitter();
    @Output() editedKeyChange = new EventEmitter<string | null>();

    constructor() {
        super();
    }

    ngOnInit(): void {}

    emitInfoHasChangedEvent() {
        this.infoHasChangedEvent.emit(true);
    }

    setEditedKey(key: string | null) {
        this.editedKey = key;
        this.editedKeyChange.emit(key);
    }
}
