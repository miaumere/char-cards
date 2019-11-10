import { Component, OnInit, Input } from '@angular/core';
import { IconEnum } from 'src/app/enum/icon.enum';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() icon = IconEnum;

  constructor() { }

  ngOnInit() {
    console.log(this.icon)
  }

}
