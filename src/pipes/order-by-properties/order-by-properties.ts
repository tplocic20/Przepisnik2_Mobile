import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipesOrderByPropertiesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orderByProperty',
})
export class OrderByPropertiesPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], prop: string) {
    if (!items) return items;
    return items.sort((a, b) => {
      if(a[prop] < b[prop]) return -1;
      if(a[prop] > b[prop]) return 1;
      return 0;
    })
  }
}
