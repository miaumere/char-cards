import { Component, Input, OnInit } from '@angular/core';
import { ITemperament } from 'src/app/modules/characters/models/temperament.model';

@Component({
    selector: 'app-temperament-bars [temperaments]',
    templateUrl: './temperament-bars.component.html',
    styleUrls: ['./temperament-bars.component.scss'],
})
export class TemperamentBarsComponent implements OnInit {
    @Input() temperaments: ITemperament | null = null;

    constructor() {}

    ngOnInit(): void {}
}
