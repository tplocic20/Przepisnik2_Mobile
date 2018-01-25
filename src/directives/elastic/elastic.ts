import {Directive, ElementRef} from '@angular/core';

/**
 * Generated class for the ElasticDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[elastic]' // Attribute selector
})
export class ElasticDirective {

  constructor(public element:ElementRef){
    this.element = element;
  }

  ngAfterViewInit(){
    if ( this.element.nativeElement.querySelector("textarea").style)
    this.element.nativeElement.querySelector("textarea").style.height = "calc(100vh - 360px)";
  }

}
