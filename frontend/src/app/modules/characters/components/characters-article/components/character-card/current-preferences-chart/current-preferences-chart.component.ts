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
  selector: 'app-current-preferences-chart',
  templateUrl: './current-preferences-chart.component.html',
  styleUrls: ['./current-preferences-chart.component.scss']
})


export class CurrentPreferencesComponent extends BaseComponent implements OnInit {
  @ViewChild('preferencesChart')
  private chartContainer: ElementRef;

  @Input() preferences: CharacterPreferences[];


  isLinearChartVisible: boolean = false;

  chosenCharId?: number;


  readonly preferenceTypes: IPreferenceTypes[] = [
    {
      preferenceType: 'love',
      color: '#C9A6A6',
      preferenceMin: 90,
      preferenceMax: 100
    },
    {
      preferenceType: 'admiration',
      color: '#C7B7AB',
      preferenceMin: 75,
      preferenceMax: 90
    },
    {
      preferenceType: 'sympathy',
      color: '#BFC9AA',
      preferenceMin: 60,
      preferenceMax: 75
    },
    {
      preferenceType: 'neutral',
      color: '#C4C4C4',
      preferenceMin: 45,
      preferenceMax: 60
    },
    {
      preferenceType: 'conflict',
      color: '#B3C2CD',
      preferenceMin: 30,
      preferenceMax: 45
    },
    {
      preferenceType: 'enemy',
      color: '#CBA6B8',
      preferenceMin: 15,
      preferenceMax: 30
    },
    {
      preferenceType: 'hatred',
      color: '#8B8B8B',
      preferenceMin: 0,
      preferenceMax: 15
    }
  ];

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
    const element = this.chartContainer.nativeElement;
    const svgWidth = this.chartContainer.nativeElement.offsetWidth;
    const svgHeight = 100;
    const margin = { top: 30, right: 40, bottom: 50, left: 60 };
    const height = svgHeight - margin.top - margin.bottom;
    const width = svgWidth - margin.left - margin.right;

    let circles;
    let rects;
    let transform;

    const xAxisScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);


    const lazyZoom = _.debounce((event) => {
      const new_xScale = event.transform.rescaleX(xAxisScale);
      const transform: d3.ZoomTransform = event.transform;
      const transformString = `translate(${transform.x},0) scale(${transform.k},1)`;

      gX.transition()
        .duration(50)
        .call(xAxis.scale(new_xScale));

      circles?.attr('cx', (d) => new_xScale(d.range));
      rects?.attr('transform', transformString);
      d3.selectAll('line')
        .style('stroke', 'black');

      d3.selectAll('text')
        .style('fill', 'black');

    }, 10);

    const svgViewport = d3.select(element)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .call(
        d3.zoom()
          .scaleExtent([1, 4])
          .translateExtent([[0 - (width * 0.2), 0], [width * 1.2, height]])
          .on('zoom', () => {
            lazyZoom(d3.event);
          })
      );
    // Inner Drawing Space
    const innerSpace = svgViewport.append('g')
      .attr('class', 'inner_space')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const defs = svgViewport.append('defs');

    const shadowFilter = defs
      .append('filter')
      .attr('id', 'shadow');

    shadowFilter
      .append('svg:feDropShadow')
      .attr('dx', '0.2')
      .attr('dy', '0')
      .attr('stdDeviation', '1.7');


    for (const pref of this.preferences) {
      defs
        .append('pattern')
        .attr('id', 'image_' + pref.relCharId)
        .attr('x', '0')
        .attr('y', '0')
        .attr('height', '1')
        .attr('width', '1')
        .attr('patternContentUnits', 'objectBoundingBox')
        .append('image')
        .attr('x', '0')
        .attr('y', '0')
        .attr('height', '1')
        .attr('width', '1')
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .attr('xlink:href', `data:image/${pref.relCharAvatar?.extension};base64,${pref.relCharAvatar?.image}`);
    }


    rects = innerSpace.append('g')
      .attr('id', 'rects')
      .selectAll('rect')
      .data(this.preferenceTypes)
      .enter()
      .append('rect')
      .attr('width', (d) => (xAxisScale(d.preferenceMax - d.preferenceMin)))
      .attr('height', '50')
      .attr('y', '-40')
      .attr('x', (d) => xAxisScale(d.preferenceMin))
      .attr('style', 'filter: url(#shadow)')
      .attr('fill', (d) => d.color);

    const circlesGroup = innerSpace.append('g')
      .attr('id', 'circles')
      .selectAll('circle')
      .data(this.preferences)
      .enter()

    // circlesGroup


    circles = circlesGroup
      .append('circle')
      .attr('r', 18)
      .attr('cy', '-10')
      .attr('cx', (d) => xAxisScale(d.range))
      .attr('stroke', 'black')
      .attr('fill', (d) => `url(#image_${d.relCharId})`)
      .on("click", (d) => {
        this.isLinearChartVisible = true;
        this.chosenCharId = d.relCharId;
      })

    // create axis objects
    const xAxis = d3.axisBottom(xAxisScale);
    const gX = innerSpace.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    d3.selectAll('line')
      .style('stroke', 'black');

    d3.selectAll('path')
      .style('stroke', 'black');

    d3.selectAll('text')
      .style('fill', 'black');

  }

}
