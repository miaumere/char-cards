import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/core/base.component';
import { CharactersService } from 'src/app/core/service/characters.service';
import { IAllPreferences } from 'src/app/modules/characters/models/all-preferences.model';


interface IPreferenceTypes {
  preferenceType: string;
  color: string;
  preferenceMin: number;
  preferenceMax: number;
}


interface IHistoricalPreferencesComponentRouteParams {
  id: string;
}


@Component({
  selector: 'app-historical-preferences-chart',
  templateUrl: './historical-preferences-chart.component.html',
  styleUrls: ['./historical-preferences-chart.component.scss']
})
export class HistoricalPreferencesComponent extends BaseComponent implements OnInit, OnChanges {


  private chartContainer: ElementRef | undefined;
  @ViewChild('historicalPreferencesChart') set content(content: ElementRef) {

    this.chartContainer = content;
  }


  @Input() preferenceTypes: IPreferenceTypes[];
  @Input() relatedCharId: number;

  charId: number = Number((this._activatedRoute.snapshot.params as IHistoricalPreferencesComponentRouteParams).id);

  isLinearChartVisible = false;

  historicalPreferences: IAllPreferences;

  constructor(
    private _translate: TranslateService,
    private _charactersService: CharactersService,
    private _activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {

    this.getHistoricalPreferences();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const relatedCharChanges: SimpleChange | undefined = (changes.relatedCharId);
    if (relatedCharChanges?.firstChange === false) {
      this.getHistoricalPreferences();
    }
  }



  getHistoricalPreferences() {
    this.subscriptions$.add(
      this._charactersService
        .getCharactersHistoricalPreferences(this.charId, this.relatedCharId)
        .subscribe(historicalPreferences => {
          this.historicalPreferences = historicalPreferences;
          this.createChart();
        })
    );

  }

  createChart() {
  }

}
