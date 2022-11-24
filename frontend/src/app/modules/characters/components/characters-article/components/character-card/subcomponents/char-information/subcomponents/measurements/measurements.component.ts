import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    IMeasurementObj,
    IMeasurements,
} from 'src/app/modules/characters/models/measurements.model';

@Component({
    selector: 'app-measurements [measurements] [form] [isUserLogged]',
    templateUrl: './measurements.component.html',
    styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
    readonly Object = Object;

    @Input() isUserLogged: boolean = false;
    @Input() measurements: { [key: string]: IMeasurementObj } = {};
    @Input() form: FormGroup = new FormGroup({});
    @Output() measurementsChangedEvent = new EventEmitter();

    constructor() {}

    ngOnInit() {
        if (!this.isUserLogged) {
            for (const key of Object.keys(this.measurements)) {
                this.form.get(`${key}Weight`)?.disable();
                this.form.get(`${key}Height`)?.disable();
            }
        }
    }

    inputChange() {
        this.measurementsChangedEvent.emit();
    }
}
