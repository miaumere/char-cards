import { FormControl, UntypedFormGroup } from '@angular/forms';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { IColors } from 'src/app/modules/characters/models/colors.model';

@Component({
    selector: 'app-colors',
    templateUrl: './colors.component.html',
    styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent implements OnInit {
    @Input() colors: IColors | null = null;
    @Input() form: UntypedFormGroup = new UntypedFormGroup({});
    @Input() isUserLogged: boolean = false;

    @Input() editedKey: string | null = null;
    @Output() editedKeyChange = new EventEmitter<string | null>();
    @Output() saveEvent = new EventEmitter();

    constructor() {}

    ngOnInit(): void {
        if (!this.isUserLogged) {
            this.form.get('eyeColor1')?.disable();
            this.form.get('eyeColor2')?.disable();
            this.form.get('themeColor1')?.disable();
            this.form.get('themeColor2')?.disable();
            this.form.get('themeColor3')?.disable();
            this.form.get('hairColor')?.disable();
            this.form.get('skinColor')?.disable();
            this.form.updateValueAndValidity();
        }
    }
}
