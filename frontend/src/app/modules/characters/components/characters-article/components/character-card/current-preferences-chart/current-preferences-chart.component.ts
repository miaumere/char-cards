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

  svgViewport;

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
    let circles;

    const xAxisScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    const svgViewport = d3.select(element)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .style('background', 'rgba(245, 245, 245, 0.3)')
      .call(d3.zoom().on('zoom', () => {
        console.log('zium');

        const new_xScale = d3.event.transform.rescaleX(xAxisScale);


        gX.transition()
          .duration(50)
          .call(xAxis.scale(new_xScale));


        if (circles) {
          circles.attr('cx', (d) => { return new_xScale(d.range); });
        }


      }));


    // Inner Drawing Space
    const innerSpace = svgViewport.append('g')
      .attr('class', 'inner_space')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

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

    circles = innerSpace.append('g')
      .attr('id', 'circles')
      .selectAll('circle')
      .data(this.preferences)
      .enter()
      .append('circle')
      .attr('r', 19)
      .attr('fill', (d) => { console.log(d); return 'red' })
      .attr('cy', '0')
      .attr('cx', (d) => { return xAxisScale(d.range); })
      .attr('stroke', 'black')
      .attr('fill', (d) => {
        return `url(#image_${d.relCharId})`
      })
    // .attr('fill', 'url(#image_' + pref.relCharId + ')');
    // .style('fill', 'red');



    // create axis objects
    const xAxis = d3.axisBottom(xAxisScale);
    const gX = innerSpace.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);





    // Draw Axis
    // const gY = innerSpace.append('g')
    //   .attr('class', 'axis axis--y')
    //   .call(yAxis);

    // append zoom area
    // const view = innerSpace.append('rect')
    //   .attr('class', 'zoom')
    //   .attr('width', width)
    //   .attr('height', height)
    //   .attr('fill', 'transparent')
    //   .call(zoom);


    // for (const pref of this.preferences) {

    //   const newCircle = innerSpace.append('circle')
    //     .attr('cx', xAxisScale(pref.range))
    //     .attr('class', 'circle')
    //     .attr('r', 20)
    //     .attr('stroke', 'black')
    //     .attr('fill', 'url(#image_' + pref.relCharId + ')');

    //   circles.push(newCircle);


    // }


  }

}
