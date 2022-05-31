import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITemperament } from 'src/app/modules/characters/models/temperament.model';

@Component({
    selector: 'app-temperament-bars [temperaments] [form] [isUserLogged]',
    templateUrl: './temperament-bars.component.html',
    styleUrls: ['./temperament-bars.component.scss'],
})
export class TemperamentBarsComponent implements OnInit {
    @Input() temperaments: ITemperament | null = null;
    @Input() form: FormGroup = new FormGroup({});
    @Input() isUserLogged: boolean = false;
    @Input() editedKey: string | null = null;
    @Input('color') themeColor1: string = '';

    @Output() saveEvent = new EventEmitter();
    @Output() editedKeyChange = new EventEmitter<string | null>();

    constructor() {}

    ngOnInit(): void {}

    save(): void {
        this.saveEvent.emit();
    }

    cancel() {
        this.editedKey = null;
        this.editedKeyChange.emit(null);
    }

    setEditedKey(key: string | null) {
        this.editedKey = key;
        this.editedKeyChange.emit(key);
    }
}
