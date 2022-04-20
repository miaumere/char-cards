import { Pipe, PipeTransform } from '@angular/core';
import { Gender, GenderString } from '../../admin-panel/enums/gender.enum';

@Pipe({
    name: 'genderIconColor',
})
export class GenderIconColorPipe implements PipeTransform {
    transform(value: GenderString | Gender): string | void {
        switch (value) {
            case 'FEMALE':
            case Gender.FEMALE:
                return '#fff';

            case 'MALE':
            case Gender.MALE:
                return '#89cff0';

            case 'UNKNOWNGENDER':
            case Gender.UNKNOWNGENDER:
                break;
            default:
                break;
        }
    }
}
