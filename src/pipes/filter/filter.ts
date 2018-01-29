import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    if (filter.length < 3) {
      return items;
    }

    return items.filter(item => {
      return Object.keys(item).some(key => {
        return item[key].toString().toLowerCase().indexOf(filter.toString().toLowerCase()) != -1;
      })
    });
  }

  // private filter(items, filter){
  //   return items.filter(item => {
  //     return Object.keys(item).some(key => {
  //       return item[key].toString().toLowerCase().indexOf(filter.toString().toLowerCase() != -1);
  //     })
  //   })
  // }
}
