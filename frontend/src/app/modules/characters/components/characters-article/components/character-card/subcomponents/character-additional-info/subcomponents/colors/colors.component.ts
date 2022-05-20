import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IColors } from 'src/app/modules/characters/models/colors.model';

@Component({
    selector: 'app-colors',
    templateUrl: './colors.component.html',
    styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent implements OnInit {
    @Input() colors: IColors | null = null;
    @Input() form: FormGroup = new FormGroup({});

    @Input() editedKey: string | null = null;
    @Output() editedKeyChange = new EventEmitter<string | null>();
    @Output() saveEvent = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
}
