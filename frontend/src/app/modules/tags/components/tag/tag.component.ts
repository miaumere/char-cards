import { Component, Input, OnInit } from '@angular/core';
import { ITag } from '../../models/tag.model';

import * as tinycolor from 'tinycolor2';

@Component({
    selector: 'app-tag [tagData]',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
    @Input() tagData?: ITag = undefined;
    textColor: string = '';

    constructor() {}

    ngOnInit(): void {
        this.textColor = tinycolor(this.tagData?.color).isLight()
            ? 'black'
            : 'white';
    }
}
