import { trigger, style, transition, animate } from "@angular/animations";

const loading = trigger('loading', [
  transition('void => *', [
    style({
      opacity: 0,
      height: 0,
      borderWidth: 0,
      marginTop: 0,
      marginBottom: 0,
    }),
    animate('250ms ease-in', style({
      opacity: 1,
      height: '*',
      borderWidth: '*',
      marginTop: '*',
      marginBottom: '*',
    }))
  ]),
  transition('* => void', [
    style({
      opacity: 1,
      height: '*',
      borderWidth: '*',
      marginTop: '*',
      marginBottom: '*',
    }),
    animate('500ms ease-out', style({
      opacity: 0,
      height: 0,
      borderWidth: 0,
      marginTop: 0,
      marginBottom: 0,
    }))
  ])
]);

export let animations = {
  loading
}
