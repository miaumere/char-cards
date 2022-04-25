import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import * as tinycolor from 'tinycolor2';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent extends BaseComponent implements OnInit {
    childBackground = '';
    ngOnInit() {}

    bgColorFromChild(bgColor: string) {
        this.childBackground =
            '' + tinycolor(this.childBackground).darken(20).desaturate(45);

        this.childBackground = bgColor ? bgColor : 'grey';
    }
}
