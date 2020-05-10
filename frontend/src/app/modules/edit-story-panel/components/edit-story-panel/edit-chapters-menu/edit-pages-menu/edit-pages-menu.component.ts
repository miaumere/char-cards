import { ToastrService } from 'ngx-toastr';
import { StoryService } from 'src/app/core/service/story.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';

import * as tinycolor from 'tinycolor2';
import { Page } from 'src/app/modules/pages/models/pages/page.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-pages-menu',
  templateUrl: './edit-pages-menu.component.html',
  styleUrls: ['./edit-pages-menu.component.scss']
})
export class EditPagesMenuComponent extends BaseComponent implements OnInit {
  fontColor = 'white';
  bookColor: string;
  bookId: number;

  filesListNumber = 0;
  fileList: FileList;

  chapterId: number;

  pages: Page[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _storyService: StoryService,
    private _toastrService: ToastrService
  ) { super(); }

  ngOnInit() {
    this._activatedRoute?.parent?.queryParams
      .subscribe(queryParam => {
        this.chapterId = +queryParam.chapterId;
        this.bookColor = queryParam.color;
        this.fontColor = queryParam.fontColor;
        this.bookId = +queryParam.id;
        this.getPages();
      });


  }


  getPages() {
    this.subscriptions$.add(
      this._storyService
        .getPagesForChapter(this.chapterId)
        .subscribe(pages => {
          this.pages = pages;
          console.log(pages)
        })
    );

  }


  insertDeleteInfo() {
    this._toastrService.warning('Aby usunąć stronę, naciśnij dwa razy.');
  }

  onFileInput(fileList: FileList) {
    this.fileList = fileList;
    this.filesListNumber = fileList.length;
  }


  drop(e: CdkDragDrop<string[]>) {
    const page = this.pages[e.previousIndex]
    this.pages.splice(e.previousIndex, 1);
    this.pages.splice(e.currentIndex, 0, page);

    const ids: number[] = [];
    for (const key in this.pages) {
      if (this.pages.hasOwnProperty(key)) {
        const element = this.pages[key];
        ids.push(element.id);
      }
    }
  }


  addNewPages() {

    const formData = new FormData();
    if (this.fileList) {
      for (let i = 0; i < this.fileList.length; i++) {
        formData.append('image' + i, this.fileList[i]);
      }
    }
  }

  deletePage(id: number) {
    this.subscriptions$.add(
      this._storyService
        .deletePage(id)
        .subscribe(_ => {
          this._toastrService.success('Udało się usunąć wybraną stronę!');
          this.getPages();
        }, err => {
          this._toastrService.error('Nie udało się usunąć wybranej części.');
        })
    )
  }

}
