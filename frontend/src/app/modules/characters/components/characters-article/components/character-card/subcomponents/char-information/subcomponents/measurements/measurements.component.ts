import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    IMeasurements,
    Measurements,
} from 'src/app/modules/characters/models/measurements.model';

@Component({
    selector: 'app-measurements [measurements] [form] [isUserLogged]',
    templateUrl: './measurements.component.html',
    styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
    @Input() isUserLogged: boolean = false;
    @Input() measurements: Measurements | null = null;
    @Input() form: FormGroup = new FormGroup({});
    @Output() measurementsChangedEvent = new EventEmitter();

    displayedColumns: string[] = ['baby', 'child', 'teen', 'adult'];

    measurementsData: [string[], string[]] = [[], []];

    constructor() {}

    ngOnInit() {
        this.measurementsData = [
            ['babyHeight', 'childHeight', 'teenHeight', 'adultHeight'],
            ['babyWeight', 'childWeight', 'teenWeight', 'adultWeight'],
        ];

        if (!this.isUserLogged) {
            for (const measurementData of this.measurementsData) {
                for (const measurement of measurementData) {
                    this.form.get(measurement)?.disable();
                }
            }
        }
    }
    inputChange() {
        this.measurementsChangedEvent.emit();
    }
}
