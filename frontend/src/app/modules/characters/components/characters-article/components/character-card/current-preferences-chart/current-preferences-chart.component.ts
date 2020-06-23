import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as d3 from 'd3';
import { BaseComponent } from 'src/app/core/base.component';
import { CharacterPreferences } from 'src/app/modules/characters/models/character-preferences.model';

@Component({
  selector: 'app-current-preferences-chart',
  templateUrl: './current-preferences-chart.component.html',
  styleUrls: ['./current-preferences-chart.component.scss']
})
export class CurrentPreferencesComponent extends BaseComponent implements OnInit {
  @ViewChild('preferencesChart')
  private chartContainer: ElementRef;

  @Input() preferences: CharacterPreferences[];
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
    let circles: any = [];


    const svgViewport = d3.select(element)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .style('background', 'rgba(245, 245, 245, 0.3)');


    const data = [0, 100];
    const extent = d3.extent(data);

    const xAxisScale = d3.scaleLinear()
      .domain(extent as any)
      .range([0, width]);

    // const yAxisScale = d3.scaleLinear()
    //   .domain([0, 5])
    // .range([height, 0]);


    // create axis objects
    const xAxis = d3.axisBottom(xAxisScale);

    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .on('zoom', () => {
        const transform: d3.ZoomTransform = d3.event.transform;
        // const transformedXScale = transform.rescaleX<any>(xAxisScale)

        transform.scale(1);

        const new_xScale = transform.rescaleX(xAxisScale);
        // update axes
        gX.call(xAxis.scale(new_xScale));

        // lines.attr('cx', function(d) { return transform.applyX(xAxisScale(d)); });
        // bars.attr('cx', function(d) { return transform.applyX(xAxisScale(d)); });



        for (const circle of circles) {
          console.log(transform)
          // const transformString = `translate(${transform.x},0) scale(${transform.k},1)`
          const transformString = `translate(${transform.x},0) scale(${transform.k},1)`

          circle.attr('transform', transformString);
          // circle.style('transform', 'scale(1)')

        }


        // update circle
      });

    // Inner Drawing Space
    const innerSpace = svgViewport.append('g')
      .attr('class', 'inner_space')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(zoom);


    for (const pref of this.preferences) {
      const defs = svgViewport.append('defs');
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


    // Draw Axis
    const gX = innerSpace.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    // const gY = innerSpace.append('g')
    //   .attr('class', 'axis axis--y')
    //   .call(yAxis);

    // append zoom area
    const view = innerSpace.append('rect')
      .attr('class', 'zoom')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent')
      .call(zoom);


    for (const pref of this.preferences) {

      const newCircle = innerSpace.append('circle')
        .attr('cx', xAxisScale(pref.range))
        .attr('r', 20)
        .attr('stroke', 'black')
        .attr('fill', 'url(#image_' + pref.relCharId + ')')

      circles.push(newCircle)


    }


  }
}
