import { Component, Input, OnInit } from '@angular/core';
type iconType = '' | 'warning' | 'new-character' | 'face' | 'hair' | 'clothing' | 'eye'
  | 'edit' | 'edit-picture' | 'character' | 'archive' | 'non-archive' | 'unknown' | 'x'
  | 'new-chars' | 'story' | 'book' | 'quote' | 'plus' | 'branch'
  | 'male' | 'female';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})

export class IconComponent implements OnInit {

  @Input() icon: iconType = '';
  @Input() color = '';
  @Input() size = '';

  constructor() {

  }
  // Przykładowe zastosowanie komponentu z ikonką:
  // <app-icon [icon]="'warning'" [color]="'red'" [size]="'4'"></app-icon>

  ngOnInit() {
    if (this.size) {
      this.size = 'scale(' + this.size + ')';
    }

  }
}
