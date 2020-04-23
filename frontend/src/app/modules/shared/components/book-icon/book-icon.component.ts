import { Component, Input, OnInit } from '@angular/core';
import * as tinycolor from 'tinycolor2';

type iconType = '';

@Component({
  selector: 'app-book-icon',
  templateUrl: './book-icon.component.html',
  styleUrls: ['./book-icon.component.scss']
})

export class BookIconComponent implements OnInit {

  @Input() icon: iconType = '';
  @Input() color = '';
  @Input() size = '';
  @Input() number?: number;

  numberFontColor = 'black';


  constructor() {

  }
  // Przykładowe zastosowanie komponentu z ikonką:
  // <app-book-icon [icon]="'warning'" [color]="'red'" [size]='4' [number]='4'></app-book-icon>
  ngOnInit() {
    if (this.size) {
      this.size = 'scale(' + this.size + ')';
    }
    if (this.color) {
      const bookColor = tinycolor(this.color)
      if (bookColor.isLight()) {
        this.numberFontColor = 'black';
      } else {
        this.numberFontColor = 'white';
      }
    }


  }
}
