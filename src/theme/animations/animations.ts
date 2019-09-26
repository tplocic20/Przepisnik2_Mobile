import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';

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
      animate(duration + 'ms ease', keyframes([
        style({opacity: '1'}),
        style({height: '*'})
      ]))
    ]),
    transition('* => void', [
      animate(duration + 'ms ease', style({height: '0'}))
    ])
  ]);
}
export function SlideRight(duration: number = 300) {
  return trigger('slideR', [
    state('void', style({
      transform: 'translateX(200%)',
      opacity: '0',
      overflow: 'hidden'
    })),
    state('*', style({
      transform: 'translateX(0)',
      opacity: '1',
      overflow: 'hidden'
    })),
    transition('void => *', [
      animate(duration + 'ms 400ms ease-in-out', keyframes([
        style({opacity: '1'}),
        style({transform: 'translateX(0)'})
      ]))
    ]),
    transition('* => void', [
      animate(duration + 'ms ease-in-out', keyframes([
        style({opacity: '0'}),
        style({transform: 'translateX(-100%)'})
      ]))
    ])
  ]);
}

export function SlideLeft(duration: number = 300) {
  return trigger('slideL', [
    state('void', style({
      transform: 'translateX(-100%)',
      opacity: '0',
      overflow: 'hidden'
    })),
    state('*', style({
      transform: 'translateX(0)',
      opacity: '1',
      overflow: 'hidden'
    })),
    transition('void => *', [
      animate(duration + 'ms ease', keyframes([
        style({opacity: '1'}),
        style({transform: 'translateX(0)'})
      ]))
    ])
  ]);
}

export function Slide(duration: number = 300) {
  return trigger(
    'slide',
    [
      transition(
        'void => prev', // ---> Entering --->
        [
          style({
            transform: 'translateX(-100%)',
            opacity: 0.0,
            zIndex: 2
          }),
          animate(
            duration + 'ms ease-in-out',
            style({
              transform: 'translateX(0)',
              opacity: 1.0,
              zIndex: 2
            })
          )
        ]
      ),
      transition(
        'void => next', // <--- Entering <---
        [
          style({
            transform: 'translateX(100%)',
            opacity: 0.0,
            zIndex: 2
          }),
          animate(
            duration + 'ms ease-in-out',
            style({
              transform: 'translateX(0)',
              opacity: 1.0,
              zIndex: 2
            })
          )
        ]
      )
    ]
  );
}
