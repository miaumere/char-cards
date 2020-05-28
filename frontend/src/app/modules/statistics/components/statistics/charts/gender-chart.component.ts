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
      .attr('height', element.offsetHeight)
      .attr('stroke', 'white')

    const data = [this.genderStatistics.femaleNumber, this.genderStatistics.maleNumber];

    const width: number = +svg.attr('width');
    const height: number = +svg.attr('height');

    const radius = Math.min(width, height) / 2;
    const g = svg.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


    const color = d3.scaleOrdinal(['#EDA4D5', '#5EC9E4']);
    const arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(40)

    const label = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - 35)

    const group = g.selectAll('arc')
      .data(d3.pie()(data))
      .enter()


    group
      .append('path')
      .attr('fill', (d, i) => {
        return color(i as any);
      })
      .attr('class', 'test')
      .transition()
      .duration(1000)
      .attrTween('d', (d): any => {
        var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return t => {
          d.endAngle = i(t);
          return arc(<any>d);
        }
      });

    group
      .append('text')
      .attr('fill', 'transparent')
      .transition()
      .duration(1000)
      .attr('transform', (d) => {
        return 'translate(' + label.centroid(d as any) + ')';
      })
      .attr('fill', 'white')
      .attr('stroke', 'rgba(0, 0, 0, 0.7)')
      .attr('font-size', '0.7rem')
      .attr('stroke-width', '1px')
      .text((d) => { return '' + d.data; })
  }

  test() {

  }

}

