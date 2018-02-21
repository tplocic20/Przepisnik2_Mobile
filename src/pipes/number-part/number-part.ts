import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberPart',
})
export class NumberPartPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, percentValue: number) {
    const num = +value;

    if (!isNaN(num)) {
      const calc =  (num * (percentValue / 100));
      return calc;
    }else {
      return value;
    }
  }
}
