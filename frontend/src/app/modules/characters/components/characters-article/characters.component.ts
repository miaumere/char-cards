import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { AuthService } from 'src/app/core/service/auth.service';
import * as tinycolor from 'tinycolor2';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent extends BaseComponent implements OnInit {
    childBackground = '';

    constructor() {
        super();
    }
    ngOnInit() {}

    bgColorFromChild(bgColor: string) {
        this.childBackground =
            '' + tinycolor(this.childBackground).darken(20).desaturate(45);

        this.childBackground = bgColor ? bgColor : 'grey';
    }
}
