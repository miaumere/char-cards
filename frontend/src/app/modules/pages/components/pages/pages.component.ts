import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }


}
