import { Component, Input, OnInit } from '@angular/core';
import {
    IMeasurements,
    Measurements,
} from 'src/app/modules/characters/models/measurements.model';

@Component({
    selector: 'app-measurements [measurements]',
    templateUrl: './measurements.component.html',
    styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
    @Input() measurements: Measurements;

    displayedColumns: string[] = ['baby', 'child', 'teen', 'adult'];

    measurementsData: any;

    constructor() {}

    ngOnInit() {
        const measurementsInstance = new Measurements(this.measurements);

        const characterHeight = [
            measurementsInstance.getValueWithUnit(
                measurementsInstance.babyHeight,
                'height'
            ),
            measurementsInstance.getValueWithUnit(
                measurementsInstance.childHeight,
                'height'
            ),
            measurementsInstance.getValueWithUnit(
                measurementsInstance.teenHeight,
                'height'
            ),
            measurementsInstance.getValueWithUnit(
                measurementsInstance.adultHeight,
                'height'
            ),
        ];
        const characterWeight = [
            measurementsInstance.getValueWithUnit(
                measurementsInstance.babyWeight,
                'weight'
            ),
            measurementsInstance.getValueWithUnit(
                measurementsInstance.childWeight,
                'weight'
            ),
            measurementsInstance.getValueWithUnit(
                measurementsInstance.teenWeight,
                'weight'
            ),
            measurementsInstance.getValueWithUnit(
                measurementsInstance.adultWeight,
                'weight'
            ),
        ];
        this.measurementsData = [characterHeight, characterWeight];
    }
}
