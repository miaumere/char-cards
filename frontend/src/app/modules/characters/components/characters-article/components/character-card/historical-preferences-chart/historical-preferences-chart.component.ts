import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { BaseComponent } from 'src/app/core/base.component';
import { CharacterPreferences } from 'src/app/modules/characters/models/character-preferences.model';


interface IPreferenceTypes {
  preferenceType: string;
  color: string;
  preferenceMin: number;
  preferenceMax: number;
}

@Component({
  selector: 'app-historical-preferences-chart',
  templateUrl: './historical-preferences-chart.component.html',
  styleUrls: ['./historical-preferences-chart.component.scss']
})


export class HistoricalPreferencesComponent extends BaseComponent implements OnInit {
  @ViewChild('historicalPreferencesChart')
  private chartContainer: ElementRef;

  @Input() preferenceTypes: IPreferenceTypes[];

  isLinearChartVisible: boolean = false;


  constructor(
    private _translate: TranslateService
  ) { super(); }

  ngOnInit() {
    setTimeout(() => {
      this.chartContainer = this.chartContainer;
      this.createChart();
    }, 0);

  }

  createChart() {

  }

}
