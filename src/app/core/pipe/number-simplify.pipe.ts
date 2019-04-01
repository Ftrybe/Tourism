import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numberSimplify'
})
export class NumberSimplifyPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const number = value.toString();
    if (number.length < 4) {
      return number;
    }
    const decimal = number.substring(number.length - 3, number.length - 2);
    return parseFloat(parseInt(String(number / 10000), 0) + '.' + decimal) + 'k';
  }

}
