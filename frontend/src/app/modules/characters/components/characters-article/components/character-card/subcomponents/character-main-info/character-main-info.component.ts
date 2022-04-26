import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { CountriesService } from 'src/app/core/service/countries.service';
import { Character } from 'src/app/modules/characters/models/character.model';
import { IColors } from 'src/app/modules/characters/models/colors.model';

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

    currentImageIndex = 0;
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

    setImage(imageIndex: number) {
        this.currentImageIndex = imageIndex;
    }

    getLinearGradientForEyeColor(colors: IColors) {
        return {
            'background-image': `linear-gradient(to right, ${colors.eyeColor1} 75%,  ${colors.eyeColor2} 75%,  ${colors.eyeColor2})`,
        };
    }
}
