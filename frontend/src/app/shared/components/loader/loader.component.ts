import { animations } from './../../../animations';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [animations.loading]
})
export class LoaderComponent implements OnInit {

  /* PRZYKŁAD UŻYCIA:
  <app-loader [visible]="!loading"></app-loader>
  */

  @Input() visible = false;
  constructor() { }

  ngOnInit() {
  }

}
