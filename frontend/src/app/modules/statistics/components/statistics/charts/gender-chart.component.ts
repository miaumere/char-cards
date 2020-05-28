import { IGenderStatistics } from './../../../models/gender-statistics.model';
import { BaseComponent } from 'src/app/core/base.component';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-gender-chart',
  templateUrl: './gender-chart.component.html',
  styleUrls: ['./gender-chart.component.scss']
})
export class GenderChartComponent extends BaseComponent implements OnInit {
  @ViewChild('chart')
  private chartContainer: ElementRef;


  @Input() genderStatistics: IGenderStatistics;

  margin = { top: 20, right: 20, bottom: 30, left: 40 };

  private width: number;
  private height: number;

  constructor(
  ) { super(); }

  ngOnInit() {
    setTimeout(() => {
      this.chartContainer = this.chartContainer;
      this.createChart();
    }, 0);

  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const data = [this.genderStatistics.femaleNumber, this.genderStatistics.maleNumber];

    const width: number = +svg.attr('width');
    const height: number = +svg.attr('height');

    const radius = Math.min(width, height) / 2;
    const g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const color = d3.scaleOrdinal(['#EDA4D5', '#5EC9E4']);

    const pie = d3.pie()(data);

    const arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);


    let arcs = d3.pie()(data);

    g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('fill', function (d, i) {
        return color(i as any);
      }).attr('d', arc as any);


  }

}
