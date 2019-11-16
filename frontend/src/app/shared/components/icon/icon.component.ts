import { Component, OnInit, Input } from '@angular/core';
type iconType = '' | 'warning' | 'new-character' | 'face' | 'hair' | 'clothing' | 'eye';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})

export class IconComponent {

  @Input() icon: iconType = '';
  @Input() color = '';

  constructor() { }
  // Przykładowe zastosowanie komponentu z ikonką:
  // <app-icon [icon]="'warning'" [color]="'red'"></app-icon>

}
