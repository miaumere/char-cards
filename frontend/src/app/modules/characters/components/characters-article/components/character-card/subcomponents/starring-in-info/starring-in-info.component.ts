import { Component, Input, OnInit } from '@angular/core';
import { IStarringIn } from 'src/app/modules/characters/models/starring-in.model';

@Component({
    selector: 'app-starring-in-info [starringIn]',
    templateUrl: './starring-in-info.component.html',
    styleUrls: ['./starring-in-info.component.scss'],
})
export class StarringInInfoComponent implements OnInit {
    @Input() starringIn: IStarringIn[] | null = [];

    constructor() {}

    ngOnInit() {}
}
