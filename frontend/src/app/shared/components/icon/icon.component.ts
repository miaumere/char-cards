import { Component, Input, OnInit } from '@angular/core';
type iconType = '' | 'warning' | 'new-character' | 'face' | 'hair' | 'clothing' | 'eye' | 'logout' | 'user'
  | 'delete-character' | 'edit-character' | 'new-chars' | 'delete-chars' | 'edit-chars' | 'story' | 'character' | 'side-character';

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
