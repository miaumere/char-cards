import { CountriesService } from 'src/app/core/service/countries.service';
import { INationalitiesStatistics, NationalitiesStatistics } from '../../../../models/nationalities-statistics.model';
import { BaseComponent } from 'src/app/core/base.component';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { Country } from 'src/app/modules/admin-panel/models/countries/country.model';


interface INationalityStatistic {
  nationality: string;
  num: number;
  flagURL?: string;
}

@Component({
  selector: 'app-nationalities-chart',
  templateUrl: './nationalities-chart.component.html',
  styleUrls: ['./nationalities-chart.component.scss']
})

export class NationalitiesChartComponent extends BaseComponent implements OnInit {
  @ViewChild('chart')
  private chartContainer: ElementRef;

  @Input() nationalitiesStatistics: INationalitiesStatistics[];

  sortedStatistics: INationalityStatistic[] = [];

  private allCharactersNumber: number;

  constructor(
    private _countriesService: CountriesService
  ) { super(); }

  ngOnInit() {
    setTimeout(() => {
      this.chartContainer = this.chartContainer;
      const unsortedStatistics: INationalityStatistic[] = [];
      let charsNumber = 0;
      for (const statistic of this.nationalitiesStatistics) {
        charsNumber += statistic.num;

        const nationalityStatistic: INationalityStatistic = {
          flagURL: this.getCountryByCode(statistic.nationality)?.flag,
          nationality: statistic.nationality,
          num: statistic.num
        };
        unsortedStatistics.push(nationalityStatistic);
      }
      unsortedStatistics.sort((a, b) => b.num - a.num);
      unsortedStatistics.map(x => x.nationality === null ? x.nationality = 'brak' : '');
      this.sortedStatistics = unsortedStatistics.splice(0, 3);

      let otherCountriesNum = 0;

      for (const stat of unsortedStatistics) {
        otherCountriesNum += stat.num;

        console.log('unsortedStatistics: ', unsortedStatistics);

      }
      const otherNationalities: INationalityStatistic = {
        nationality: 'INNE',
        num: otherCountriesNum,
        flagURL: ''
      };
      this.sortedStatistics.push(otherNationalities);

      this.allCharactersNumber = charsNumber;

      this.createChart();
    }, 0);

  }

  getCountryByCode(code: string) {
    let country: Country | undefined;
    this.subscriptions$.add(
      this._countriesService
        .getCountryByCode(code)
        .subscribe(x => {
          country = x;
        })
    );
    return country;

  }



  createChart() {
    const element = this.chartContainer.nativeElement;
    const color = d3.scaleOrdinal(['#7E27CF', '#5A57B1', '#9c27b0', '#2CE2E7']);

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');


    // tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('id', 'mytooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .text('a simple tooltip');

    // X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(this.sortedStatistics.map((d) => d.nationality))
      .padding(0.2);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)');


    svg.selectAll('.tick')
      .data(this.sortedStatistics)
      .append('svg:image')
      .attr('xlink:href', (d) => {
        if (d.flagURL) {
          return d.flagURL;
        } else { return ''; }
      })
      .attr('class', 'flag')
      .attr('x', (d, i) => {
        return i - 35;
      })
      .attr('width', 15)
      .attr('height', 15)
      .attr('transform', 'rotate(-45)');

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, this.allCharactersNumber])
      .range([height, 0]);
    svg.append('g')
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll('mybar')
      .data(this.sortedStatistics)
      .enter()
      .append('rect')
      .attr('fill', (d, i) => {
        return color(i as any);
      })
      .attr('stroke', 'white')
      .attr('stroke-width', '1px')


      .attr("width", x.bandwidth())
      .attr("y", d => { return height; })
      .attr("x", d => { return x(d.nationality); })
      .transition()
      .duration(750)
      .delay(function (d, i) {
        return i * 150;
      })


      .attr('x', (d): any => x(d.nationality))
      .attr('y', (d) => y(d.num))
      .attr('height', (d) => height - y(d.num))



  }

}
