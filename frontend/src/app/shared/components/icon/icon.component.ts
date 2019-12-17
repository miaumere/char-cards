import { Component, Input, OnInit } from '@angular/core';
type iconType = '' | 'warning' | 'new-character' | 'face' | 'hair' | 'clothing' | 'eye'
  | 'logout' | 'user'
  | 'edit' | 'edit-picture' | 'character' | 'side-character' | 'archive' | 'non-archive'
  | 'new-chars' | 'story';

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
  // <app-icon [icon]="'warning'" [color]="'red'"></app-icon>

  ngOnInit() {
    if (this.size) {
      this.size = 'scale(' + this.size + ')';
    }

  }
}
