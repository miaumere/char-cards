import { animations } from './../../../animations';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [animations.loading]
})
export class LoaderComponent implements OnInit {

  @Input() visible: boolean;
  constructor() { }

  ngOnInit() {
  }

}
