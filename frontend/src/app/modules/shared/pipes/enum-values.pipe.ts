import { PipeTransform, Pipe } from '@angular/core';

// TODO: Add interfaces to *.d.ts files
interface IEnum {
    [id: number]: string;
}

@Pipe({ name: 'enumVal' })
export class EnumValPipe implements PipeTransform {
    transform<T>(enumVal: IEnum | object): { key: number; value: string }[] {
        const enumEntries = Object.entries(enumVal);

        const x = enumEntries
            .filter((e) => typeof e[1] === 'number')
            .map((e) => {
                return {
                    key: e[1],
                    value: e[0],
                };
            });

        return x;
    }
}
