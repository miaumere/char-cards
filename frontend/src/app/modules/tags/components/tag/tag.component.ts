import { Component, Input, OnInit } from '@angular/core';
import { ITag } from '../../models/tag.model';

import * as tinycolor from 'tinycolor2';

@Component({
    selector: 'app-tag [tagData]',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
    @Input() tagData?: ITag = undefined;

    constructor() {}
}
