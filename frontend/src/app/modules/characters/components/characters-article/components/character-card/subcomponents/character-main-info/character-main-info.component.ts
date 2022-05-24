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
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { CountriesService } from 'src/app/core/service/countries.service';
import { CharType } from 'src/app/modules/admin-panel/enums/character-type.enum';
import { Gender } from 'src/app/modules/admin-panel/enums/gender.enum';
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
    readonly Gender = Gender;
    readonly CharType = CharType;
    @Input() character: Character | null = null;
    @Input('color') themeColor1: string = '';
    @Input('bgColor') bgColor1: string = '';
    @Input('bgColorSecond') bgColor2: string = '';
    @Input() isUserLogged: boolean = false;
    @Input() editedKey: string | null = null;
    @Input() form = new FormGroup({});

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
