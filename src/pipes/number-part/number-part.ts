import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NumberPartPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'numberPart',
})
export class NumberPartPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, percentValue: number) {
    const num = +value;
    if (!isNaN(num)){
      return (num * (percentValue / 100)).toString();
    }else {
      return value;
    }
  }
}
