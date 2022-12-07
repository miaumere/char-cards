import { CharactersService } from 'src/app/core/service/characters.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    IMeasurementObj,
    IMeasurements,
} from 'src/app/modules/characters/models/measurements.model';
import { BmiValue } from './enums/bmi-value.enum';

@Component({
    selector: 'app-measurements [measurements]  [isUserLogged]',
    templateUrl: './measurements.component.html',
    styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
    readonly Object = Object;

    @Input() isUserLogged: boolean = false;
    @Input() measurements: { [key: string]: IMeasurementObj } = {};
    form = this.charactersService.form;

    @Output() measurementsChangedEvent = new EventEmitter();

    constructor(
        private translateService: TranslateService,
        private charactersService: CharactersService
    ) {}

    ngOnInit() {
        if (!this.isUserLogged) {
            for (const key of Object.keys(this.measurements)) {
                this.form.get(`${key}Height`)?.disable();
                this.form.get(`${key}Weight`)?.disable();
            }
        } else if (this.isUserLogged && !this.measurements) {
            this.measurements = {
                baby: {
                    height: 0,
                    weight: 0,
                    bmi: 0,
                },
                child: {
                    height: 0,
                    weight: 0,
                    bmi: 0,
                },
                teen: {
                    height: 0,
                    weight: 0,
                    bmi: 0,
                },
                adult: {
                    height: 0,
                    weight: 0,
                    bmi: 0,
                },
            };
        }
    }

    inputChange() {
        this.charactersService.form = this.form;
        this.measurementsChangedEvent.emit();
    }

    getColorForBmi(bmi: number): string {
        if (bmi < 16) {
            return '#082E79';
        } else if (bmi >= 16.0 && bmi <= 16.99) {
            return '#4169E1';
        } else if (bmi >= 17.0 && bmi <= 18.49) {
            return '#ACE1AF';
        } else if (bmi >= 18.5 && bmi <= 24.99) {
            return '#CDEBA7';
        } else if (bmi >= 25.0 && bmi <= 29.99) {
            return '#FFFF99';
        } else if (bmi >= 30.0 && bmi <= 34.99) {
            return '#FDE456';
        } else if (bmi >= 35.0 && bmi <= 39.99) {
            return '#CF2929';
        } else if (bmi > 40) {
            return '#b54646';
        }
        return 'white';
    }

    getNameForBmi(bmi: number): string {
        if (bmi < 16) {
            return this.translateService.instant(
                'enum.BmiValue.' + BmiValue[BmiValue.SevereThinnes]
            );
        } else if (bmi >= 16.0 && bmi <= 16.99) {
            return this.translateService.instant(
                'enum.BmiValue.' + BmiValue[BmiValue.ModerateThinnes]
            );
        } else if (bmi >= 17.0 && bmi <= 18.49) {
            return this.translateService.instant(
                'enum.BmiValue.' + BmiValue[BmiValue.MildThinnes]
            );
        } else if (bmi >= 18.5 && bmi <= 24.99) {
            return this.translateService.instant(
                'enum.BmiValue.' + BmiValue[BmiValue.Normal]
            );
        } else if (bmi >= 25.0 && bmi <= 29.99) {
            return this.translateService.instant(
                'enum.BmiValue.' + BmiValue[BmiValue.Overweight]
            );
        } else if (bmi >= 30.0 && bmi <= 34.99) {
            return this.translateService.instant(
                'enum.BmiValue.' + BmiValue[BmiValue.MildObese]
            );
        } else if (bmi >= 35.0 && bmi <= 39.99) {
            return this.translateService.instant(
                'enum.BmiValue.' + BmiValue[BmiValue.ModerateObese]
            );
        } else if (bmi > 40) {
            return this.translateService.instant(
                'enum.BmiValue.' + BmiValue[BmiValue.SevereObese]
            );
        }
        return '';
    }
}
