import { IHistoricalPreference } from './../../../../../models/historical-preference.model';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { IAllPreferences } from 'src/app/modules/characters/models/all-preferences.model';
import * as d3 from 'd3';
import * as moment from 'moment';



@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.scss']
})
export class FamilyTreeComponent extends BaseComponent implements OnInit {
  private chartContainer: ElementRef | undefined;
  @ViewChild('familyTree') set content(content: ElementRef) {
    this.chartContainer = content;
  }

  constructor(
    private _translate: TranslateService,
    private _activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {

    this.createChart();
  }




  createChart() {

  }

}
