import { Directive, ElementRef, Input, OnInit } from '@angular/core';

type temperamentType = '' | 'melancholic' | 'sanguine' | 'flegmatic' | 'choleric';
@Directive({
  selector: '[appProgressBar]'
})
export class ProgressBarDirective implements OnInit {

  @Input() percentValue = 0;
  @Input() temperamentType: temperamentType;

  el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }
  ngOnInit() {
    this.el.nativeElement.classList.add('global-progress-bar');

    const innerProgress = document.createElement('div');
    const valueSpan = document.createElement('span')

    const classToInsert = `global-progress-bar__color--${this.temperamentType}`;

    innerProgress.classList.add('global-progress-bar__color', classToInsert);
    valueSpan.classList.add('global-progress-bar__value')

    this.percentValue > 100 ? this.percentValue = 100 : this.percentValue = this.percentValue;
    innerProgress.style.width = `${this.percentValue}%`;
    valueSpan.innerText = `${this.percentValue}%`;

    innerProgress.appendChild(valueSpan)
    this.el.nativeElement.appendChild(innerProgress);

  }

}
