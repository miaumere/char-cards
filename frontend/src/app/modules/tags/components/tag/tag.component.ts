import { Component, Input, OnInit } from '@angular/core';
import { ITag } from '../../models/tag.model';

@Component({
    selector: 'app-tag [tagData]',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
    @Input() tagData?: ITag = undefined;
}
