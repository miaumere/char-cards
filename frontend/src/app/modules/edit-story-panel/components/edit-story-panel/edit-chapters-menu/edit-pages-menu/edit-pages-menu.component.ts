import { StoryService } from 'src/app/core/service/story.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';

import * as tinycolor from 'tinycolor2';
import { Page } from 'src/app/modules/pages/models/pages/page.model';

@Component({
  selector: 'app-edit-pages-menu',
  templateUrl: './edit-pages-menu.component.html',
  styleUrls: ['./edit-pages-menu.component.scss']
})
export class EditPagesMenuComponent extends BaseComponent implements OnInit {
  fontColor = 'white';
  bookColor: string;

  chapterId: number;

  pages: Page[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storyService: StoryService
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.chapterId = +queryParam.id;
        this.bookColor = queryParam.color;
      });

    this.getPages();

  }


  getPages() {
    this.subscriptions$.add(
      this._storyService
        .getPagesForChapter(this.chapterId)
        .subscribe(pages => {
          this.pages = pages;
        })
    );

  }

}
