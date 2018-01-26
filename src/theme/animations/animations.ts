import {trigger, state, style, transition, animate, keyframes} from '@angular/core';

export function Collapse(duration: number = 300) {
  return trigger('collapse', [
    state('void', style({
      height: '0',
      opacity: '0',
      overflow: 'hidden'
    })),
    state('*', style({
      height: '*',
      opacity: '1',
      overflow: 'hidden'
    })),
    transition('void => *', [
      animate(duration+'ms ease', keyframes([
        style({opacity: '1'}),
        style({height: '*'})
      ]))
    ]),
    transition('* => void', [
      animate(duration+'ms ease', style({height: '0'}))
    ])
  ]);
}
