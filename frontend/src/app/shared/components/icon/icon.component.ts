import { Component, OnInit, Input } from '@angular/core';
import { IconEnum } from 'src/app/enum/icon.enum';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {

  @Input() icon = IconEnum;
  @Input() color: string = "inherit"

  constructor() { }
  // Przykładowe zastosowanie komponentu z ikonką:
  // <app-icon [icon]="'warning'" [color]="'red'"></app-icon>

}
