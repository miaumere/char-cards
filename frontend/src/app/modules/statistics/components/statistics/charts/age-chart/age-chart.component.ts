import { TranslateService } from '@ngx-translate/core';
import { IAgeStat } from './../../../../models/age-stat.model';
import { BaseComponent } from 'src/app/core/base.component';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-age-chart',
  templateUrl: './age-chart.component.html',
  styleUrls: ['./age-chart.component.scss']
})

export class AgeChartComponent extends BaseComponent implements OnInit {
  @ViewChild('chart')
  private chartContainer: ElementRef;

  @ViewChild('tooltip')
  private tooltipContainer: ElementRef;

  @Input() ageStatistics: IAgeStat[];

  constructor(
    private translate: TranslateService
  ) { super(); }

  ngOnInit() {
    setTimeout(() => {
      this.chartContainer = this.chartContainer;
      this.tooltipContainer = this.tooltipContainer;

      this.createChart();
    }, 0);

  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    const tooltipContainer = this.tooltipContainer.nativeElement;

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');



    const defs0 = svg.append('defs');
    const bgGradient0 = defs0
      .append('linearGradient')
      .attr('id', 'bg-gradient0')
      .attr('gradientTransform', 'rotate(90)');
    bgGradient0
      .append('stop')
      .attr('stop-color', '#855898')
      .attr('offset', '0%');
    bgGradient0
      .append('stop')
      .attr('stop-color', '#4C238F')
      .attr('offset', '100%');

    const keys: string[] = [];
    let allCharsNum = 0;
    for (const ageStat of this.ageStatistics) {
      allCharsNum += ageStat.count;
      if (ageStat.label === 'Nieznany') {
        ageStat.label = this.translate.instant('STATISTICS.AGE_UNKNOWN');
      }
      keys.push(ageStat.label);
    }
    const x = d3.scaleBand()
      .range([0, width])
      .domain(keys)
      .padding(0.2);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10, 15)rotate(-45)');

    const y = d3.scaleLinear()
      .domain([0, 80])
      .range([height, 0]);
    svg.append('g')
      .call(d3.axisLeft(y));


    const bars = svg.selectAll('mybar')
      .data(this.ageStatistics)
      .enter()
      .append('rect')
      .attr('fill', (d, i) => {
        return `url(#bg-gradient${i})`;
      })

      .attr('stroke', 'white')
      .attr('stroke-width', '1px')
      .style('transition', '0.2s')

      .attr('width', x.bandwidth())
      .attr('y', d => height)
      .attr('x', d => x(d.label) as any);

    bars
      .transition()
      .duration(750)
      .delay((d, i) => {
        return i * 150;
      })
      .attr('x', (d): any => x(d.label))
      .attr('y', (d) => y(d.count))
      .attr('height', (d) => height - y(d.count));

    const tooltip = d3.select(tooltipContainer)
      .append('div')
      .style('opacity', 0)
      .style('transition', '0.2s')
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('color', 'black')
      .style('padding', '0.5rem')
      .style('border-radius', '3px')
      .style('margin-left', '15rem')
      .style('margin-top', '-15rem')


      .style('position', 'fixed');

    const mouseover = function (d) {
      tooltip
        .style('opacity', 1);
      d3.select(this)
        .style('stroke', 'black')
        .style('opacity', '0.5');

    };


    const mousemove = (d) => {
      if (d?.label !== 'Nieznany') {
        let msg = '<table>';
        msg += `<th><br/>${this.translate.instant('STATISTICS.AGE')
          }</th><th>${this.translate.instant('STATISTICS.CHARS_NUM')
          }</th> <br/ >`;
        for (const key of Object.keys(d.details)) {
          msg += `<tr> <th>${key}</th><th>${d.details[key]}</th></tr>`
        }
        msg += `</table>`
        tooltip.html(msg);
      } else {
        let msg = '';
        msg += `<strong>${this.translate.instant('STATISTICS.CHARS_NUM')}:</strong> ${d?.count}`
        tooltip.html(msg);
      }
    };
    const mouseleave = function (d) {
      tooltip
        .style('opacity', 0);
      d3.select(this)
        .style('stroke', 'white')
        .style('opacity', '1');

    };

    bars
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);

  }



}
