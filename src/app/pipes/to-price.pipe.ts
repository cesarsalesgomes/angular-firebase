import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toPrice'
})
export class ToPricePipe implements PipeTransform {

  transform(value: any): any {
    value = value.replace(/,/g, 'Q');
    value = value.replace(/\./g, ',');
    value = value.replace(/Q/g, '.');

    return value;
  }

}
