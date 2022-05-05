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

    flagURL = '';

    get hasTemperamentInfo(): boolean {
        return !!(
            this.character?.temperament?.melancholic ||
            this.character?.temperament?.sanguine ||
            this.character?.temperament?.flegmatic ||
            this.character?.temperament?.choleric
        );
    }

    constructor(private _countriesService: CountriesService) {
        super();
    }

    ngOnInit(): void {
        this.getNationalityForCharacter();
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
                            this.flagURL = flag;
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

    clicked() {
        if (this.character) {
            Object.keys(this.character);
        }
    }
}
