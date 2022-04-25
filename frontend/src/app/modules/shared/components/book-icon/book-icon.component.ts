import { Component, Input, OnInit } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TAvailableIcons } from 'src/app/modules/edit-story-panel/enums/availableIcons.enum';

@Component({
  selector: 'app-book-icon',
  templateUrl: './book-icon.component.html',
  styleUrls: ['./book-icon.component.scss']
})

export class BookIconComponent implements OnInit {

  @Input() icon: TAvailableIcons = null;
  @Input() color = '';
  @Input() size = '';
  @Input() number?: number;

  numberFontColor = 'black';


  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'pampera',
      sanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/svg/pampera.svg'));

  }
  // Przykładowe zastosowanie komponentu z ikonką:
  // <app-book-icon [icon]="'BIOHAZARD'" [color]="'red'" [size]='4' [number]='4'></app-book-icon>
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
