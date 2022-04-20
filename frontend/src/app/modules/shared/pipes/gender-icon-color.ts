import { Pipe, PipeTransform } from '@angular/core';
import { Gender, GenderString } from '../../admin-panel/enums/gender.enum';

@Pipe({
    name: 'genderIconColor',
})
export class GenderIconColorPipe implements PipeTransform {
    transform(value: GenderString | Gender): string | undefined {
        switch (value) {
            case 'FEMALE':
            case Gender.FEMALE:
                return '#FFC0CB';

            case 'MALE':
            case Gender.MALE:
                return '#89cff0';

            case 'UNKNOWNGENDER':
            case Gender.UNKNOWNGENDER:
                return '#fff';
        }
    }
}
