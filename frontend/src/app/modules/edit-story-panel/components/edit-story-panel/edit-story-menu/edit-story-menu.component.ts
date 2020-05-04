import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';

@Component({
  selector: 'app-edit-story-menu-quotes',
  templateUrl: './edit-story-menu.component.html',
  styleUrls: ['./edit-story-menu.component.scss']
})

export class EditStoryMenuComponent extends BaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
