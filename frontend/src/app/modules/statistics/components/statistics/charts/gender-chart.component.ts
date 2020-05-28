import { IGenderStatistics } from './../../../models/gender-statistics.model';
import { BaseComponent } from 'src/app/core/base.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gender-chart',
  templateUrl: './gender-chart.component.html',
  styleUrls: ['./gender-chart.component.scss']
})
export class GenderChartComponent extends BaseComponent implements OnInit {

  @Input() genderStatistics: IGenderStatistics;

  constructor(
  ) { super(); }

  ngOnInit() {
  }

  getStatistics() {
  }

}
