import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nulled'
})
export class NulledPipe implements PipeTransform {

  transform(value: any): string {
    if (value === null || value === "") {
      value = "---"
    }
    return value;
  }

}
