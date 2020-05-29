import { BaseComponent } from 'src/app/core/base.component';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { ITypeStatistics } from 'src/app/modules/statistics/models/type-statistics.model';

@Component({
  selector: 'app-type-chart',
  templateUrl: './type-chart.component.html',
  styleUrls: ['./type-chart.component.scss']
})
export class TypeChartComponent extends BaseComponent implements OnInit {
  @ViewChild('typeChart')
  private chartContainer: ElementRef;


  @Input() typeStatistics: ITypeStatistics;
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

    const data = [
      this.typeStatistics.mainCharactersNum,
      this.typeStatistics.sideCharactersNum,
      this.typeStatistics.bgCharactersNum
    ];

    const width: number = +svg.attr('width');
    const height: number = +svg.attr('height');

    const radius = Math.min(width, height) / 2;
    const g = svg.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(40)

    const label = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - 35)

    const group = g.selectAll('arc')
      .data(d3.pie()(data))
      .enter()

    // gradients
    const defs0 = svg.append('defs');
    const bgGradient0 = defs0
      .append('linearGradient')
      .attr('id', 'type-gradient0')
      .attr('gradientTransform', 'rotate(45)');
    bgGradient0
      .append('stop')
      .attr('stop-color', '#FFC1E2')
      .attr('offset', '0%');
    bgGradient0
      .append('stop')
      .attr('stop-color', '#EFB98B')
      .attr('offset', '100%');

    const defs1 = svg.append('defs');
    const bgGradient = defs1
      .append('linearGradient')
      .attr('id', 'type-gradient1')
      .attr('gradientTransform', 'rotate(45)');
    bgGradient
      .append('stop')
      .attr('stop-color', '#46CCA1')
      .attr('offset', '0%');
    bgGradient
      .append('stop')
      .attr('stop-color', '#466BCC')
      .attr('offset', '100%');

    const defs2 = svg.append('defs');
    const bgGradient2 = defs2
      .append('linearGradient')
      .attr('id', 'type-gradient2')
      .attr('gradientTransform', 'rotate(45)');
    bgGradient2
      .append('stop')
      .attr('stop-color', '#802B00')
      .attr('offset', '0%');
    bgGradient2
      .append('stop')
      .attr('stop-color', '#A03867')
      .attr('offset', '100%');

    group
      .append('path')
      .attr('fill', (d, i) => {
        return `url(#type-gradient${i})`
      })
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

}

