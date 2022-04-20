import { TranslateService } from '@ngx-translate/core';
import { CountriesService } from 'src/app/core/service/countries.service';
import {
    INationalitiesStatistics,
    NationalitiesStatistics,
} from '../../../../models/nationalities-statistics.model';
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
    styleUrls: ['./nationalities-chart.component.scss'],
})
export class NationalitiesChartComponent
    extends BaseComponent
    implements OnInit
{
    @ViewChild('chart')
    private chartContainer: ElementRef;

    @ViewChild('extraInfo')
    private extraInfoContainer: ElementRef;

    @Input() nationalitiesStatistics: INationalitiesStatistics[];

    sortedStatistics: INationalityStatistic[] = [];
    otherNationalities: INationalityStatistic[] = [];

    private allCharactersNumber: number;

    constructor(
        private _countriesService: CountriesService,
        private _translate: TranslateService
    ) {
        super();
    }

    ngOnInit() {
        setTimeout(() => {
            this.chartContainer = this.chartContainer;
            this.extraInfoContainer = this.extraInfoContainer;
            const unsortedStatistics: INationalityStatistic[] = [];
            let charsNumber = 0;
            for (const statistic of this.nationalitiesStatistics) {
                charsNumber += statistic.num;

                const nationalityStatistic: INationalityStatistic = {
                    flagURL: this.getCountryByCode(statistic.nationality)?.flags
                        ?.svg,
                    nationality: statistic.nationality,
                    num: statistic.num,
                };
                unsortedStatistics.push(nationalityStatistic);
            }
            unsortedStatistics.sort((a, b) => b.num - a.num);
            unsortedStatistics.map((x) =>
                x.nationality === null
                    ? (x.nationality =
                          this._translate.instant('STATISTICS.NONE'))
                    : ''
            );
            this.sortedStatistics = unsortedStatistics.splice(0, 3);

            let otherCountriesNum = 0;
            this.otherNationalities = unsortedStatistics;

            for (const stat of unsortedStatistics) {
                otherCountriesNum += stat.num;
            }
            const otherNationalities: INationalityStatistic = {
                nationality: this._translate.instant('STATISTICS.OTHERS'),
                num: otherCountriesNum,
                flagURL: '',
            };
            this.sortedStatistics.push(otherNationalities);

            this.allCharactersNumber = charsNumber;

            this.createChart();
        }, 0);
    }

    getCountryByCode(code: string) {
        let country: Country | undefined;
        this.subscriptions$.add(
            this._countriesService.getCountryByCode(code).subscribe((x) => {
                country = x;
            })
        );
        return country;
    }

    createChart() {
        const element = this.chartContainer.nativeElement;
        const extraInfoElement = this.extraInfoContainer.nativeElement;

        const margin = { top: 30, right: 30, bottom: 70, left: 60 };
        const width = 460 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3
            .select(element)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr(
                'transform',
                'translate(' + margin.left + ',' + margin.top + ')'
            );

        // gradients
        const defs0 = svg.append('defs');
        const bgGradient0 = defs0
            .append('linearGradient')
            .attr('id', 'bg-gradient0')
            .attr('gradientTransform', 'rotate(90)');
        bgGradient0
            .append('stop')
            .attr('stop-color', '#aa457d')
            .attr('offset', '0%');
        bgGradient0
            .append('stop')
            .attr('stop-color', '#855898')
            .attr('offset', '100%');

        const defs1 = svg.append('defs');
        const bgGradient = defs1
            .append('linearGradient')
            .attr('id', 'bg-gradient1')
            .attr('gradientTransform', 'rotate(90)');
        bgGradient
            .append('stop')
            .attr('stop-color', '#68DCBF')
            .attr('offset', '0%');
        bgGradient
            .append('stop')
            .attr('stop-color', '#636363')
            .attr('offset', '100%');

        const defs2 = svg.append('defs');
        const bgGradient2 = defs2
            .append('linearGradient')
            .attr('id', 'bg-gradient2')
            .attr('gradientTransform', 'rotate(90)');
        bgGradient2
            .append('stop')
            .attr('stop-color', '#FFA666')
            .attr('offset', '0%');
        bgGradient2
            .append('stop')
            .attr('stop-color', '#F77492')
            .attr('offset', '100%');

        const defs3 = svg.append('defs');
        const bgGradient3 = defs3
            .append('linearGradient')
            .attr('id', 'bg-gradient3')
            .attr('gradientTransform', 'rotate(90)');
        bgGradient3
            .append('stop')
            .attr('stop-color', '#68DCBF')
            .attr('offset', '0%');
        bgGradient3
            .append('stop')
            .attr('stop-color', '#1d90c5')
            .attr('offset', '100%');

        const defs4 = svg.append('defs');
        const bgGradient4 = defs4
            .append('linearGradient')
            .attr('id', 'bg-gradient4')
            .attr('gradientTransform', 'rotate(90)');
        bgGradient4
            .append('stop')
            .attr('stop-color', 'brown')
            .attr('offset', '0%');
        bgGradient4
            .append('stop')
            .attr('stop-color', '#aa457d')
            .attr('offset', '100%');

        const defs5 = svg.append('defs');
        const bgGradient5 = defs5
            .append('linearGradient')
            .attr('id', 'bg-gradient5')
            .attr('gradientTransform', 'rotate(90)');
        bgGradient5
            .append('stop')
            .attr('stop-color', '#d6d6d6')
            .attr('offset', '0%');
        bgGradient5
            .append('stop')
            .attr('stop-color', '#636363')
            .attr('offset', '100%');

        // X axis
        const x = d3
            .scaleBand()
            .range([0, width])
            .domain(this.sortedStatistics.map((d) => d.nationality))
            .padding(0.2);

        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,10)rotate(-45)');

        svg.selectAll('.tick')
            .data(this.sortedStatistics)
            .append('svg:image')
            .attr('xlink:href', (d) => {
                if (d.flagURL) {
                    return d.flagURL;
                } else {
                    return '';
                }
            })
            .attr('class', 'flag')
            .attr('x', (d, i) => {
                return i - 35;
            })
            .attr('width', 15)
            .attr('height', 15)
            .attr('transform', 'translate(-10,5)rotate(-45)');

        // Add Y axis
        const y = d3
            .scaleLinear()
            .domain([0, this.allCharactersNumber])
            .range([height, 0]);
        svg.append('g').call(d3.axisLeft(y));

        // Bars
        const bars = svg
            .selectAll('mybar')
            .data(this.sortedStatistics)
            .enter()
            .append('rect')
            .attr('fill', (d, i) => {
                return `url(#bg-gradient${i})`;
            })

            .attr('stroke', 'white')
            .attr('stroke-width', '1px')
            .style('transition', '0.2s')

            .attr('width', x.bandwidth())
            .attr('y', (d) => height)
            .attr('x', (d) => x(d.nationality) as any);

        bars.transition()
            .duration(750)
            .delay((d, i) => {
                return i * 150;
            })
            .attr('x', (d): any => x(d.nationality))
            .attr('y', (d) => y(d.num))
            .attr('height', (d) => height - y(d.num));

        const tooltip = d3
            .select(extraInfoElement)
            .append('div')
            .style('opacity', 0)
            .style('transition', '0.2s')
            .attr('class', 'tooltip')
            .style('background-color', 'white')
            .style('color', 'black')
            .style('padding', '0.5rem')
            .style('border-radius', '3px')
            .style('margin-left', '15rem')

            .style('position', 'fixed');

        const mouseover = function (d) {
            tooltip.style('opacity', 1);
            d3.select(this).style('stroke', 'black').style('opacity', '0.5');
        };
        const otherNationalities = this.otherNationalities;

        let tooltipMessageForOthers = '';
        for (const nationality of this.otherNationalities) {
            if (nationality.flagURL) {
                tooltipMessageForOthers += `<img src="${nationality.flagURL}"  width="20"/>`;
            }
            tooltipMessageForOthers += `
<strong> ${
                nationality.nationality
                    ? nationality.nationality
                    : this._translate.instant('STATISTICS.NONE')
            } </strong>
      ${this._translate.instant('STATISTICS.CHARS_NUM')}: <strong>${
                nationality.num
            }</strong>

      <br />
   `;
        }

        const mousemove = (d) => {
            if (
                d.nationality === this._translate.instant('STATISTICS.OTHERS')
            ) {
                tooltip.html(tooltipMessageForOthers);
            } else {
                tooltip.html(`${this._translate.instant(
                    'STATISTICS.CHARS_NUM'
                )}: <strong> ${d.num}</strong>
          `);
            }
        };
        const mouseleave = function (d) {
            tooltip.style('opacity', 0);
            d3.select(this).style('stroke', 'white').style('opacity', '1');
        };

        bars.on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave);
    }
}
