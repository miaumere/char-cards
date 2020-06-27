import { Component, OnInit, Input } from '@angular/core';
import { animations } from 'src/app/animations';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [animations.loading]
})
export class LoaderComponent implements OnInit {
  @Input() visible = false;
  @Input() fullScreen = false;

  constructor() { }

  ngOnInit() {
  }

}
