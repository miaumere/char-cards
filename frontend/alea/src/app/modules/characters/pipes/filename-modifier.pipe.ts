import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filenameModifier'
})
export class FilenameModifierPipe implements PipeTransform {

  transform(value: string): string {
    const stringWithBreaks = value.replace('_', ' ');
    const reg1 = /.png|.PNG|.jpg|.JPEG|.jpeg|.JPG/;
    const reg2 = /\_/;
    const output = stringWithBreaks.replace(reg1, '').replace(reg2, ' ');
    return output;
  }

}
